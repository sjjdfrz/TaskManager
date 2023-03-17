// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUserValidator from "App/Validators/CreateUserValidator";
import User from "App/Models/User";

export default class AuthController {


  public async signup({request, auth, response}) {

    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)

    let accessToken = await auth.use("jwt").generate(user)

    return response.json({
      "user": user,
      "access_token": accessToken
    })
  }


  public async login({auth, request, response}) {

    const email = request.input('email')
    const password = request.input('password')

    if (!email || !password)
      return {
        error:'Please provide email and password!'
      };

    const user = await User.findBy('email', email)

    if (!user)
      return {
        error:'Incorrect email or password'
      };

    const accessToken = await auth.use('jwt').generate(user)
    return response.json({
      "user": user,
      "access_token": accessToken
    })



  }

  public async logout ({ auth }) {

    await auth.use('jwt').revoke()
    return {
      status: 'success',
      revoked: true
    }

  }




 // public async protect ({auth}) {
 //    await auth.use('jwt').authenticate()
 //    console.log(auth.use('jwt').user!)
 //  }


}
