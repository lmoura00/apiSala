import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Docente from './Docente'
import Sala from './Sala'
export default class Reserva extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public salaId: number

  @belongsTo(() => Sala)
  public sala: BelongsTo<typeof Sala>

  @column()
  public docenteId: number

  @belongsTo(() => Docente)
  public docente: BelongsTo<typeof Docente>

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
