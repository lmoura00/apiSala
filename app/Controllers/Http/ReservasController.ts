import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Reserva from 'App/Models/Reserva';
import { DateTime } from 'luxon';

export default class ReservasController {
    public async index({ auth, response }: HttpContextContract) {
        const authenticate = await auth.authenticate();
        if (!authenticate) {
            return response.json({ erro: "Falta autenticação!" });
        }
        return Reserva.query();
    }
    
    public async store({ request, response, auth }: HttpContextContract) {
        const { salaId, docenteId, data_reserva, hora_inicio, hora_fim } = request.only([
            'salaId', 'docenteId', 'data_reserva', 'hora_inicio', 'hora_fim'
        ]);
  
        const dataFormatada = DateTime.fromFormat(data_reserva, 'dd-MM-yyyy');
        if (!dataFormatada.isValid) {
            return response.status(400).json({ error: 'Data inválida. Use o formato dd-MM-yyyy.' });
        }
  
        if (hora_inicio >= hora_fim) {
            return response.status(400).json({ error: 'O horário de início deve ser anterior ao horário de fim.' });
        }
        
        const userAuth = await auth.authenticate();
        if(!userAuth){
          return response.status(500).json({ error: 'Falta autenticação' });
        }
        
        try {
            const conflitos = await Reserva.query()
                .where('salaId', salaId)
                .andWhere('data_reserva', data_reserva)
                .andWhere((query) => {
                    query.whereBetween('hora_inicio', [hora_inicio, hora_fim])
                         .orWhereBetween('hora_fim', [hora_inicio, hora_fim]);
                });
  
            if (conflitos.length > 0) {
                return response.status(409).json({ error: 'Conflito de horário para esta sala.' });
            }
            const reserva = await Reserva.create({
                salaId,
                docenteId,
                data_reserva,
                hora_inicio,
                hora_fim,
                status: 'ATIVO' 
            });
  
            return response.status(201).json(reserva);
        } catch (error) {
            return response.status(500).json({ error: 'Erro ao criar reserva.', details: error.message });
        }
    }
    
    public async update({response, params}: HttpContextContract) {
      try {

        const reserva = await Reserva.findByOrFail('id', params.id)
        reserva.merge({status:"Inativo"})
        await reserva.save()
        return reserva
      } catch (error) {
        return response.status(400).json({error: "Reserva não encontrada"})
      }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            const reserva = await Reserva.findOrFail(params.id);
            await reserva.delete();
            return { message: 'Reserva deletada com sucesso' };
        } catch (error) {
            return response.json({ error: "Reserva não existente" });
        }
    }
}
