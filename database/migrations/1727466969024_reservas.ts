import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reservas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('data_reserva').notNullable()
      table.string('hora_inicio').notNullable()
      table.string('hora_fim').notNullable()
      table.string('status').notNullable()
      table.bigInteger("docente_id").unsigned().references('id').inTable('docentes').onDelete('SET NULL').onUpdate('CASCADE')
      table.bigInteger("sala_id").unsigned().references('id').inTable('salas').onDelete('SET NULL').onUpdate('CASCADE')  
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
