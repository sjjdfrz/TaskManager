import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class AuthController {

  // send success responses to client
  public sendResponse(response, status, statusCode, message, data?: object) {
    response.status(statusCode).json({
      status,
      statusCode,
      message,
      data,
    });
  }


  public async loginValidation(request) {

    // validation request.body
    const loginSchema = schema.create({

      email: schema.string([
        rules.email()
      ]),
      password: schema.string([
        rules.minLength(8)
      ])
    });

    await request.validate({schema: loginSchema});
  }

  // register new users
  public async signup({request, auth, response}) {

    // validation request.body
    const payload = await request.validate(CreateUserValidator);

    const user = await User.create(payload);

    let accessToken = await auth.use("jwt").generate(user);

    this.sendResponse(
      response,
      'success',
      200,
      'User registered successfully',
      {user, accessToken});
  }


  public async login({auth, request, response}) {

    await this.loginValidation(request);

    const email = request.input('email');
    const password = request.input('password');

    const accessToken = await auth.use('jwt').attempt(email, password);

    this.sendResponse(
      response,
      'success',
      200,
      'User logged in successfully',
      {user: auth.use("jwt").user, accessToken});
  }


  public async logout({auth, response}) {

    await auth.use('jwt').revoke();

    this.sendResponse(
      response,
      'success',
      200,
      'User logged in successfully'
    );
  }
}
