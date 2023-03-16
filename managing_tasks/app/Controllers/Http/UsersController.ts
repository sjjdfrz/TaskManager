import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";


export default class UsersController {

  public async getAllUsers() {

    const users = await User.all()
    return {
      status: 'success',
      users
    };
  }

  public async getUser({params}) {

    const user = await User.find(params.id)

    return {
      status: 'success',
      user
    };
  }


  public async createUser({request}) {

    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)

    return {
      status: 'success',
      user
    };
  }

  public async deleteUser({params}) {
    const user = await User.find(params.id)
    if (user) await user.delete()

    return {
      status: 'success'
    };
  }

  public async updateUser({params, request}) {

    const payload = await request.validate(CreateUserValidator)

    await User
      .query()
      .where('id', params.id)
      .update({...payload})

    return {
      status: 'success'
    };
  }
}
