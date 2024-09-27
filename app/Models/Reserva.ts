import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Reserva extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public data_reserva: string

  @column()
  public hora_inicio: string
  
  @column()
  public hora_fim: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
