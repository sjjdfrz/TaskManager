import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class AuthController {

  // register new users
  public async signup({request, auth, response}) {

    // validation request.body
    const payload = await request.validate(CreateUserValidator);

    const user = await User.create(payload);

    let accessToken = await auth.use("jwt").generate(user);

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'User registered successfully',
      data: {user, accessToken},
    });
  }


  public async login({auth, request, response}) {

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

    const email = request.input('email');
    const password = request.input('password');

    const accessToken = await auth.use('jwt').attempt(email, password);

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'User logged in successfully',
      data: {user: auth.use("jwt").user, accessToken},
    });
  }


  public async logout({auth, response}) {

    await auth.use('jwt').revoke();

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'User logged out successfully',
    });
  }
}
