import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import {HttpException} from "@adonisjs/http-server/build/src/Exceptions/HttpException";
import {AuthenticationException} from "@adonisjs/auth/build/standalone";

export default class Restrict {
  public async handle (
    { auth }: HttpContextContract,
    next: () => Promise<void>,

  ) {

    if (! auth.use("jwt").user)
      throw new AuthenticationException(
        'Unauthorized access',
        'E_UNAUTHORIZED_ACCESS'
      )

    // @ts-ignore
    if (auth.use("jwt").user.role !== 'admin')
      throw new HttpException('you are not admin!', 403);

    await next()
  }
}
