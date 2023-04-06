import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator';
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext';

// validator class for tasks
export default class CreateTaskValidator {
  constructor(protected ctx: HttpContextContract) {
  }

  public schema = schema.create({

    name: schema.string([
      rules.alpha(),
      rules.trim(),
      rules.escape()
    ]),

    created_at: schema.date.optional(),

    updated_at: schema.date.optional(),

    priority: schema.enum(['high', 'medium', 'low'] as const),

    photo: schema.string.optional()
  });


  public messages: CustomMessages = {};
}
