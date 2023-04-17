import User from "App/Models/User";
import Application from "@ioc:Adonis/Core/Application";
import Drive from '@ioc:Adonis/Core/Drive';
import Hash from "@ioc:Adonis/Core/Hash";
import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class UsersController {

  // download user file by its ID
  public async downloadUserFile({params, response}) {

    // find user from database by ID
    const user = await User.findOrFail(params.id);

    // the photo property of each user is the name of file(photo)
    const location = user.photo;

    // streaming file
    response.stream(await Drive.getStream(`users/${location}`));
  }


  public async uploadUserFile({request, params, response}) {

    // validation file
    const file = request.file('file', {
      size: '10mb'
    });

    // if there is no file
    if (!file) {

      response.status(404).json({
        status: 'fail',
        statusCode: 404,
        message: 'File is not found!'
      });
    }

    // validation of file failed
    if (!file.isValid) {

      response.status(415).json({
        status: 'fail',
        statusCode: 415,
        message: 'File is not valid!'
      });
    }

    // store file to tmp/uploads/users folder
    await file.move(Application.tmpPath('uploads/users'));

    // save the name of file in database
    await User
      .query()
      .where('id', params.id)
      .update({photo: file.fileName});

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'File uploaded successfully.',
      data: file,
    });
  }


  public async getAllUsers({request, response}) {

    /*
     this function is for send back all users.
     also we can paginate, sort and search users.
     the sorting is default by "created_at" property
     and searching can be done only by "name" property.
    */

    const page = request.all().page || 1;
    const sortBy = request.all().sort || 'created_at';
    const searchByName = request.all().name || '';

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
      statusCode: 200,
      message: 'Sending list of all users to client successfully.',
      data: users,
    });
  }


  // send back user by id to client
  public async getUser({params, response}) {

    const user = await User.findOrFail(params.id);

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Sending the user to client successfully.',
      data: user
    });
  }


  // delete specific user by ID
  public async deleteUser({params, response}) {

    const user = await User.findOrFail(params.id);
    await user.delete();

    response.status(202).json({
      status: 'success',
      statusCode: 202,
      message: 'Deleting the user successfully.',
    });
  }


  // update name,email,password of specific user by id
  public async updateUser({params, request, response}) {

    // validation
    const updateSchema = schema.create({

      name: schema.string.optional([
        rules.alpha(),
        rules.trim(),
        rules.escape()
      ]),

      email: schema.string.optional({}, [rules.email(), rules.unique({table: 'users', column: 'email'})]),

      password: schema.string.optional({}, [rules.minLength(8)])
    });

    await request.validate({schema: updateSchema});

    if (request.all().password)
      request.all().password = await Hash.make(request.all().password);

    await User
      .query()
      .where('id', params.id)
      .update({...request.all()});

    response.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Updating the user successfully.',
    });
  }
}
