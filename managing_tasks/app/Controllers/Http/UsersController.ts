import User from "App/Models/User";
import Application from "@ioc:Adonis/Core/Application";
import Drive from '@ioc:Adonis/Core/Drive';
import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {

  public async downloadUserFile({params, response, auth}) {

    await auth.use('jwt').authenticate();

    const user = await User.findOrFail(params.id)
    const location = user.photo;
    console.log(location);

    response.stream(await Drive.getStream(`users/${location}`));

  }


  public async uploadUserFile({request, params, response, auth}) {

    await auth.use('jwt').authenticate();

    const file = request.file('file', {
      size: '10mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (!file) {
      return response.status(404).json({
        status: 'fail',
        message: 'file is not found!'
      });
    }

    if (!file.isValid) {
      return response.status(415).json({
        status: 'fail',
        message: 'file is not valid!'
      });
    }

    await file.move(Application.tmpPath('uploads/users'))

    await User
      .query()
      .where('id', params.id)
      .update({photo: file.fileName});

    return response.status(200).json({
      status: 'success'
    });
  }


  public async getAllUsers({request, auth, response}) {

    await auth.use('jwt').authenticate();

    const page = request.all().page || 1;
    const sortBy = request.all().sort || 'created_at';
    const searchByName = request.all().name || '';

    if (auth.use("jwt").user.role === 'admin') {

      let users;

      if (searchByName) {
        users = await User
          .query()
          .where('name', searchByName)
          .orderBy(sortBy)
          .paginate(page, 5);
      } else {
        users = await User
          .query()
          .orderBy(sortBy)
          .paginate(page, 5);
      }
      response.status(200).json({
        status: 'success',
        users
      });
    } else throw new HttpException('you are not admin!', 403);
  }


  public async getUser({params, response, auth}) {

    await auth.use('jwt').authenticate();

    if (auth.use("jwt").user.role === 'admin') {
      const user = await User.findOrFail(params.id);

      response.status(200).json({
        status: 'success',
        user
      });
    } else throw new HttpException('you are not admin!', 403);
  }


  public async deleteUser({params, response, auth}) {

    await auth.use('jwt').authenticate();

    if (auth.use("jwt").user.role === 'admin') {

      const user = await User.findOrFail(params.id);
      await user.delete();

      response.status(200).json({
        status: 'success'
      });
    } else throw new HttpException('you are not admin!', 403);
  }


  public async updateUser({params, request, response, auth}) {

    await auth.use('jwt').authenticate();

    if (auth.use("jwt").user.role === 'admin') {

      if (request.all().password)
        request.all().password = await Hash.make(request.all().password);

      await User
        .query()
        .where('id', params.id)
        .update({...request.all()});

      response.status(200).json({
        status: 'success',
      });
    } else throw new HttpException('you are not admin!', 403);
  }
}
