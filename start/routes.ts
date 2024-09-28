import Route from '@ioc:Adonis/Core/Route'

Route.post("/session", "SessionsController.store")
Route.delete("/session", "SessionsController.destroy").middleware('auth')

Route.resource("/docentes", "DocentesController").apiOnly()
Route.group(()=>{
    Route.resource("/salas", "SalasController").apiOnly()
    Route.resource("/reserva", "ReservasController").apiOnly()



  }
).middleware('auth')