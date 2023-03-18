import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";

export default class AuthController {

  public async signup({request, auth, response}) {

    const payload = await request.validate(CreateUserValidator);

    const user = await User.create(payload);

    let accessToken = await auth.use("jwt").generate(user);

    response.status(200).json({
      status: 'success',
      user,
      accessToken
    });
  }


  public async login({auth, request, response}) {

    const email = request.input('email');
    const password = request.input('password');

    const accessToken = await auth.use('jwt').attempt(email, password);

    response.status(200).json({
      status: 'success',
      accessToken
    });
  }


  public async logout({auth}) {
    await auth.use('jwt').revoke();
  }
}
