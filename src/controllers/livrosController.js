import {autores, livros} from "../models/index.js";


class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const buscaLivros = livros.find();


      req.resultado = buscaLivros
      next();

    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  static listarLivroPorId = async (req, res, next) => {
      try {
        const id = req.params.id;

        const livroResultado = await livros.findById(id)
          .populate("autor", "nome")
          .exec();

        if (livroResultado !== null) {
          res.status(200).send(livroResultado);
        } else {
          next(new NaoEncontrado("Id do livro não localizado."));
        }
      } catch (erro) {
        next(erro);
      }
    };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const livrosResultado =  livros
        .find(busca)
        .populate("autor");
      req.resultado = livrosResultado

        next();

      }else{
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros){
  const {editora, titulo, minP, maxP, nomeAutor} = parametros;

    let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minP || maxP) busca.numeroPaginas = {};

  if(minP) busca.numeroPaginas.$gte = minP
  if(maxP) busca.numeroPaginas.$lte = maxP

  if(nomeAutor){
    const autor =  await autores.findOne({nome: nomeAutor});

    if(autor !== null){
      busca.autor = autor._id;
    }else{
      busca = null;
    }


  }

  return busca;
}


export default LivroController;