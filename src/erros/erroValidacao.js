import ReqIncorreta from "./reqIncorreta.js";

class ErroValidacao extends ReqIncorreta{

    constructor(erro){

        const mensagemErro = Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ");

        super(`Os seguintes erros foram encontrados: ${mensagemErro}`)
    }
}

export default ErroValidacao;