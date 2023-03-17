import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email', 100)
      table.string('name', 100)
      table.string('password', 180)
      // table.string('remember_me_token')
      table.enum('role',['user', 'admin']).defaultTo('user')
      table.string('photo',100).defaultTo('default.png')

      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
