import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import ReqIncorreta from "../erros/reqIncorreta.js";
import ErroValidacao from "../erros/erroValidacao.js";
import NaoEncontrado from "../erros/naoEncontrado.js";

function manipuladorDeErros(erro, req, res, next){
  if(erro instanceof mongoose.Error.CastError){
    new ReqIncorreta().enviarReposta(res);

  }else if (erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarReposta(res);

  }else if (erro instanceof NaoEncontrado){
    erro.enviarReposta(res);

  }else{
    new ErroBase().enviarReposta(res);
  }
}



export default manipuladorDeErros;