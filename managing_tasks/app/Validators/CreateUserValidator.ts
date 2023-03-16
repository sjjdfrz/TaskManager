import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    name:schema.string([
      rules.alpha(),
      rules.trim(),
      rules.escape()
    ]),

    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),

    password: schema.string({}, [rules.minLength(8)]),

    role: schema.enum.optional( ['admin', 'user'] as const),

    photo:schema.string.optional()

  })

  public messages: CustomMessages = {}
}
