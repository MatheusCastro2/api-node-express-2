import ErroBase from "./erroBase.js";

class NaoEncontrado extends ErroBase{
    constructor(mensagem = "Pagina nao encontrada"){
        super(mensagem, 404);
    }
}

export default NaoEncontrado;