import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sala from 'App/Models/Sala'

export default class SalasController {
    public async index({auth, response}: HttpContextContract) {
        const salas = await auth.authenticate()
        if(!salas){
            return response.json("Falha de acesso")
        }
        return Sala.all()
    }

    public async store({ request }) {
        const data = request.only(['nome', 'capacidade', 'descricao'])
        const sala = await Sala.create(data)
        return sala
    }
    
    public async update({ params, request }) {
        const sala = await Sala.findOrFail(params.id)
        sala.merge(request.only(['nome', 'capacidade']))
        await sala.save()
        return sala
    }
    
    public async destroy({ params }) {
        const sala = await Sala.findOrFail(params.id)
        await sala.delete()
        return { message: 'Sala deletada com sucesso' }
    }
    
}
