class ErroBase extends Error{

    constructor(mensagem = "Erro interno no Servidor", status= 500){
        super();
        this.message = mensagem;
        this.status = status;
    }


    enviarReposta(res){
        res.status(this.status).send({
            mensagem: this.message,
            status: this.status
        });
    }

}

export default ErroBase;