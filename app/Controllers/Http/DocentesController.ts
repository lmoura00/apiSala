import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Docente from 'App/Models/Docente'
import Reserva from 'App/Models/Reserva';



export default class DocentesController {
  public async index({}: HttpContextContract) {
    const docentes = await Docente.query().preload('reservas');
    return docentes;
  }

  public async store({request, response}: HttpContextContract) {
    try {
      const {nome, email, password} = request.only(['nome', 'email', 'password'])
      const docente = await Docente.create({
        nome, 
        email,
        password
      })
      return docente
    } catch (error) {
      return response.json({error: "Usuário já existe!"})
    }
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const classes = await Reserva.query().where('docenteId', params.id)
      return classes
    } catch (error) {
      return response.status(400).json({error: "Docente não encontrado."})
    }
  }

  public async update({request, response, params}: HttpContextContract) {
    try {
      const {nome, email, password} = request.only(['nome', 'email', 'password'])
      const docente = await Docente.findByOrFail('id', params.id)
      docente.merge({nome, email, password})
      await docente.save()
      return docente
    } catch (error) {
      return response.status(400).json({error: "Docente não encontrado"})
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const docente = await Docente.findByOrFail('id', params.id)
      await docente.delete()
      return response.status(203)
    } catch (error) {
      return response.status(400).json({error: "Docente não encontrado"})
    }
  }
}
