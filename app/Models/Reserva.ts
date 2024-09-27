import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import {Docente} from 'app/models/docente'
import {Sala} from 'app/models/sala'

export default class Reserva extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Docente)
  public docente: HasOne<typeof Docente>

  @hasOne(() => Sala)
  public sala: HasOne<typeof Sala>

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
