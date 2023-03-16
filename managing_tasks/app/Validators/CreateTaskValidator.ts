import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

    name:schema.string([
      rules.alpha(),
      rules.trim(),
      rules.escape()
    ]),

    create_date: schema.date.optional({format: 'sql'}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),

    update_date: schema.date.optional({format: 'sql'}, [rules.minLength(8)]),

    priority: schema.enum( ['high', 'medium', 'low'] as const),

    photo:schema.string.optional()
  })


  public messages: CustomMessages = {}
}
