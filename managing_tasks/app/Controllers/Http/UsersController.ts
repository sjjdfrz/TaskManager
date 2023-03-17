import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";
import Application from "@ioc:Adonis/Core/Application";
import Drive from '@ioc:Adonis/Core/Drive'

export default class UsersController {


  public async downloadUserFile({params, response}) {
    const location = `${params.filename}`
    console.log(location)
    response.stream(await Drive.getStream(location))
  }



  public async uploadUserFile({request, params, response}) {
    const file = request.file('file', {
      size: '5mb',
      extnames: ['jpg', 'png', 'gif'],
    })

    if (file && file.isValid) {
      await file.move(Application.tmpPath('uploads'))

      await User
        .query()
        .where('id', params.id)
        .update({photo: file.fileName})

      response.status(200).json({
        status: 'success'
      })
    } else {
      response.status(404).json({
        status: 'fail',
        message: 'file not found or is not valid.'
      })
    }

  }


  public async getAllUsers({request, auth, response}) {

    const page = request.all().page || 1


    try {
      await auth.use('jwt').authenticate()

      if (auth.use("jwt").user.role === 'admin') {
        const users = await User.query().paginate(page, 5)


        response.status(200).json({
          status: 'success',
          users
        })
      } else
        throw 'you are not admin!'


    } catch (err) {
      response.status(404).json({
        status: 'fail',
        message: err
      })
    }
  }

  public async getUser({params, response, auth}) {

    try {
      await auth.use('jwt').authenticate()

      if (auth.use("jwt").user.role === 'admin') {
        const user = await User.find(params.id)

        response.status(200).json({
          status: 'success',
          user
        })
      } else
        throw 'you are not admin!'

    } catch (err) {
      return response.status(404).json({
        status: 'fail',
        message: err
      })
    }
  }


  // public async createUser({request}) {
  //
  //   const payload = await request.validate(CreateUserValidator)
  //
  //   const user = await User.create(payload)
  //
  //   return {
  //     status: 'success',
  //     user
  //   };
  // }

  public async deleteUser({params, response, auth}) {


    try {
      await auth.use('jwt').authenticate()

      if (auth.use("jwt").user.role === 'admin') {
        const user = await User.find(params.id)
        if (!user) throw 'user not find!'

        await user.delete()
        response.status(200).json({
          status: 'success',
          user
        })
      } else
        throw 'you are not admin!'
    } catch (err) {
      return response.status(404).json({
        status: 'fail',
        message: err
      })
    }
  }

  public async updateUser({params, request, response, auth}) {

    try {
      await auth.use('jwt').authenticate()


      if (auth.use("jwt").user.role === 'admin') {

        const payload = await request.validate(CreateUserValidator)

        await User
          .query()
          .where('id', params.id)
          .update({...payload})

        response.status(200).json({
          status: 'success',
        })
      } else
        throw 'you are not admin!'


    } catch (err) {
      return response.status(404).json({
        status: 'fail',
        message: err
      })
    }
  }
}
