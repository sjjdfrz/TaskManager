import {DateTime} from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {column, BaseModel, beforeSave} from '@ioc:Adonis/Lucid/Orm';

enum Roles{
  user='user',
  admin='admin'
}

export default class User extends BaseModel {



  @column({isPrimary: true})
  public id: number;

  @column()
  public email: string;

  @column({serializeAs: null})
  public password: string;

  @column()
  public name: string;

  // @column()
  // public rememberMeToken: string | null

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime;

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime;

  @column()
  public role: Roles;

  @column()
  public photo: string;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  // @beforeUpdate()
  // public static async hashPassword(user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await Hash.make(user.password);
  //   }
  // }
}
