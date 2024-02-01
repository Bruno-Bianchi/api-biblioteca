import { autor } from "../models/index.js"
import NaoEncontrado from "../erros/NaoEncontrado.js"

class AutorController {
  // LIST
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find()

      req.resultado = listaAutores

      if(listaAutores.length !== 0) {
        next()
      } else {
        next(new NaoEncontrado("Não há autores disponíveis!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  // CREATE
  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body)
      res.status(201).json({ message: "Criado com sucesso", autor: novoAutor })
    } catch (erro) {
      next(erro)
    }
  }

  // GET ID
  static async getAutorId(req, res, next) {
    try {
      const id = req.params.id
      const getAutorId = await autor.findById(id)

      if(getAutorId !== null) {
        res.status(200).json(getAutorId)
      } else {
        next(new NaoEncontrado("Id do autor não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  // UPDATE
  static async updateAutor(req, res, next) {
    try {
      const id = req.params.id
      const result = await autor.findByIdAndUpdate(id, req.body)
      
      if(result !== null) {
        res.status(201).json({ message: "Autor atualizado com sucesso!"})
      } else {
        next(new NaoEncontrado("Id do autor não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  //DELETE
  static async deleteAutor(req, res, next) {
    try {
      const id = req.params.id
      const result = await autor.findByIdAndDelete(id)
      
      if(result !== null) {
        res.status(200).json({ message: "Autor excluído com sucesso!" })
      } else {
        next(new NaoEncontrado("Id do autor não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }
}

export default AutorController 
