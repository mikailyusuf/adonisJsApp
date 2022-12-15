import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('name')
      table.string('email').index()
      table.string('password')
      table.string('avatar').nullable()
      table.string('details').nullable()
      table.string('username').index()
      table.dateTime('email_verified_at').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
