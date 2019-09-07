var express         = require('express');
var router          = express.Router();
var GaleriaModel    = require('../model/galeria/GaleriaModel');
var RespostaClass   = require('../model/RespostaClass');

var fs              = require('fs');
var pasta_Publica   = "./public/imagens/"; 

router.get("/", function(req, resp, next){
    GaleriaModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
            console.log('erro: ', erro);
        } 
        else {
            resposta.dados = retorno;
        }

        resp.json(resposta); //converte o objeto de retorno em json
    });
});

router.get("/:id?", function(req, resp, next){
    GaleriaModel.getId(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
            console.log('erro: ', erro);
        } 
        else {
            resposta.dados = retorno;
        }

        resp.json(resposta); //converte o objeto de retorno em json
    });
});

router.post("/?", function(req, resp, next){

    let resposta = new RespostaClass();

    //verificando se recebeu uma imagem
    if(req.body.dados_imagem != null) {
        
        //Salvar a Imagem
        //let bitmap              = new Buffer(req.body.dados_image.imagem_base64, 'base64');
        let bitmap              = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
        let dataAtual           = new Date().toLocaleString().replace(/\//g,"")
        .replace(/:/g,"").replace(/-/g,"").replace(/ /g,"");
        let nomeImagemCaminho   = pasta_Publica + dataAtual + req.body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho        = nomeImagemCaminho;
        
        GaleriaModel.adicionar(req.body, function(erro, retorno) {
            if(erro){
                resposta.erro   = true;
                resposta.msg    = "Ocorreu um Erro";
                console.log('erro: ', erro);
            } 
            else {
                if(retorno.affectedRows > 0) {
                    resposta.msg    = "Cadastro efetuado com Sucesso";
                }
                else {
                    resposta.erro   = true;
                    resposta.msg    = "Não foi pssível realizar a operação";
                };
            }
            console.log('resp:', resposta);
            resp.json(resposta); //converte o objeto de retorno em json
        });
    }
    else {
        resposta.erro    = true;
        resposta.msg     = "Não foi enviado uma imagem";
        console.log();
        resp.json(resposta);
    }
        
});

router.put("/", function(req, resp, next){

    let resposta = new RespostaClass();

    //verificando se recebeu uma imagem
    if(req.body.dados_imagem != null) {
        //Salvar a Imagem
        let bitmap              = new Buffer.from(req.body.dados_imagem.imagem_base64, 'base64');
        let dataAtual           = new Date().toLocaleString().replace(/\//g,"")
        .replace(/:/g,"").replace(/-/g,"").replace(/ /g,"");
        let nomeImagemCaminho   = pasta_Publica + dataAtual + req.body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);
        req.body.caminho        = nomeImagemCaminho;
    }    

    GaleriaModel.editar(req.body, function(erro, retorno) {
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
            console.log('erro: ', erro);
        } 
        else {
            if(retorno.affectedRows > 0) {
                resposta.msg    = "Atualização realizada com Sucesso";
            }
            else {
                resposta.erro   = true;
                resposta.msg    = "Não foi pssível realizar a operação";
            };
        }
        console.log('resp:', resposta);
        resp.json(resposta); //converte o objeto de retorno em json
    });
        
});

router.delete("/:id?", function(req, resp, next){
    GaleriaModel.deletar(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
            console.log('erro: ', erro);
        } 
        else {
            
            if(retorno.affectedRows > 0) {
                resposta.msg    = "Exclusão realizada com Sucesso";
            }
            else {
                resposta.erro   = true;
                resposta.msg    = "Não foi pssível excluir o registro";
            };

            resposta.dados = retorno;
        }

        resp.json(resposta); //converte o objeto de retorno em json
    });
});


module.exports = router;