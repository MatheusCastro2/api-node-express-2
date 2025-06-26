import ErroBase from "./erroBase.js";

class ReqIncorreta extends ErroBase{
    constructor(mensagem = "Um ou mais dados fornecids estao incorretos"){
        super(mensagem, 400);
    };

}

export default ReqIncorreta;