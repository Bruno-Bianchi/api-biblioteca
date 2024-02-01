import mongoose from "mongoose"
import { autorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O(a) autor(a) do livro é obrigatório!"]
    },
    titulo: { 
        type: String, 
        required: [true, "O título do livro é obrigatório!"]
    },
    editora: { 
        type: String,
        required: [true, "A Editora do livro é obrigatória!"]
    },
    preco: { type: Number },
    paginas: { 
        type:Number, 
        validate: {
            validator: (valor) => {
                return valor >= 10 && valor <= 5000
            },
            message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
        }
    },
}, { versionKey: false })

const livro = mongoose.model("livros", livroSchema)

export default livro
