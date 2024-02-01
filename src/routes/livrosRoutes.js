import { Router } from "express"
import LivroController from "../controllers/livroController.js"
import paginar from "../middlewares/paginar.js"

const routes = Router()

routes.post("/livros", LivroController.cadastrarLivro)
routes.get("/livros/select", LivroController.listarLivrosPorFiltro, paginar)
routes.get("/livros/list", LivroController.listarLivros, paginar)
routes.get("/livros/:id", LivroController.getLivroId)
routes.put("/livros/:id", LivroController.updateLivro)
routes.delete("/livros/:id", LivroController.deleteLivro)

export default routes
