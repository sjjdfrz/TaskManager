import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',40)
      table.string('email',40)
      table.string('photo',100).defaultTo('default.png')
      table.enum('role',['user', 'admin']).defaultTo('user')
      table.string('password',100)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
