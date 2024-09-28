import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserva from 'App/Models/Reserva'
import Docente from 'App/Models/Docente'
export default class ReservasController {
    public async index({auth, response}:HttpContextContract) {
        const authenticate = await auth.authenticate()
        if(!authenticate){
            return response.json({erro: "Falta autenticação!"})
        }
        return Reserva.query().preload('sala').preload('docente')
    }
    
    public async store({ request }:HttpContextContract) {
        const { salaId, docente_id, data, horaInicio, horaFim } = request.only([
          'salaId', 'docente_id', 'data', 'horaInicio', 'horaFim'
        ])
    
        // Verificação de conflito de horário
        const conflitos = await Reserva.query()
          .where('salaId', salaId)
          .andWhere('data', data)
          .andWhere((query) => {
            query.whereBetween('hora_inicio', [horaInicio, horaFim])
                 .orWhereBetween('hora_fim', [horaInicio, horaFim])
          })
    
        if (conflitos.length > 0) {
          return { error: 'Conflito de horário para esta sala.' }
        }
    
        const reserva = await Reserva.create({ sala_id, docente_id, data_reserva, horaInicio, horaFim })
        return reserva
    }
    
    public async destroy({ params }:HttpContextContract) {
        const reserva = await Reserva.findOrFail(params.id)
        await reserva.delete()
        return { message: 'Reserva deletada com sucesso' }
    }
    

}
