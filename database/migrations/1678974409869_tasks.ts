import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'tasks';

  public async up() {
    // create tasks table in db_schema
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name');
      table.enum('priority', ['high', 'medium', 'low']);
      table.string('photo').defaultTo('default.png');
      table.datetime('created_at', {useTz: true});
      table.datetime('updated_at', {useTz: true});
    });
  }
  // drop tasks table
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
