import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator';
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';

// validator class for users
export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({

    name: schema.string([
      rules.alpha(),
      rules.trim(),
      rules.escape()
    ]),

    email: schema.string({}, [rules.email(), rules.unique({table: 'users', column: 'email'})]),

    password: schema.string({}, [rules.minLength(8)]),

    role: schema.enum.optional(['admin', 'user'] as const),

    photo: schema.string.optional(),

    created_at: schema.date.optional(),

    updated_at: schema.date.optional()
  });

  public messages: CustomMessages = {};
}
