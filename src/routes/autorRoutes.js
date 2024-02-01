import { Router } from "express"
import AutorController from "../controllers/autorController.js"
import paginar from "../middlewares/paginar.js"

const routes = Router()

routes.post("/autores", AutorController.cadastrarAutor)
routes.get("/autores/list", AutorController.listarAutores, paginar)
routes.get("/autores/:id", AutorController.getAutorId)
routes.put("/autores/:id", AutorController.updateAutor)
routes.delete("/autores/:id", AutorController.deleteAutor)

export default routes
