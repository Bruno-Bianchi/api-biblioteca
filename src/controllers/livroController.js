import NaoEncontrado from "../erros/NaoEncontrado.js"
import { livro, autor } from "../models/index.js"

class LivroController {
  // LIST
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find()

      req.resultado = buscaLivros

      next() // para executar o próximo middleware -> paginar
    } catch (erro) {
      next(erro)
    }
  }

  // CREATE
  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor)
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }}
      
      const livroCriado = await livro.create(livroCompleto)
      res.status(201).json({ message: "Criado com sucesso", livro: livroCriado })
    } catch (erro) {
      next(erro)
    }
  }

  // GET ID
  static async getLivroId(req, res, next) {
    try {
      const id = req.params.id
      const getLivroId = await livro.findById(id)

      if(getLivroId !== null) {
        res.status(200).json(getLivroId)
      } else {
        next(new NaoEncontrado("Id do livro não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  // UPDATE
  static async updateLivro(req, res, next) {
    try {
      const id = req.params.id
      const result = await livro.findByIdAndUpdate(id, req.body)

      if(result !== null) {
        res.status(201).json({ message: "Livro atualizado com sucesso!"})
      }else {
        next(new NaoEncontrado("Id do livro não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  //DELETE
  static async deleteLivro(req, res, next) {
    try {
      const id = req.params.id
      const result = await livro.findByIdAndDelete(id)

      if(result !== null) {
        res.status(200).json({ message: "Livro excluído com sucesso!" })
      } else {
        next(new NaoEncontrado("Id do livro não encontrado!"))
      }
    } catch (erro) {
      next(erro)
    }
  }

  //LISTAR POR EDITOR 
  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processoBusca(req.query)
      const livrosResultado = await livro.find(busca)

      if(busca !== null) {
        const livrosResultado = livro
          .find(busca)
          .populate("autor")

        req.resultado = livrosResultado

        next()
      } else {
        res.status(200).send([])
      }
    } catch (erro) {
      next(erro)
    }
  }
}

async function processoBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const busca = {}

  if(editora) busca.editora = editora
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" }

  if(minPaginas || maxPaginas) busca.numeroPaginas = {}

  if(minPaginas) busca.numeroPaginas.$gte = minPaginas
  if(maxPaginas) busca.numeroPaginas.$lte = maxPaginas

  if(nomeAutor) {
    const resultAutor = await autor.findOne({ nome: nomeAutor })

    const autorId = resultAutor._id

    busca.autor = autorId
  }

  return busca
}


export default LivroController 
