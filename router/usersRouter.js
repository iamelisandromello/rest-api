var express         = require('express');
var router          = express.Router();
var UsersModel      = require('../model/users/UsersModel');
var RespostaClass   = require('../model/RespostaClass');

router.get("/", function(req, resp, next){
    UsersModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
        } 
        else {
            resposta.dados = retorno;
        }

        resp.json(resposta); //converte o objeto de retorno em json
    });
});

router.get("/:id?", function(req, resp, next){
    UsersModel.getId(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro   = true;
            resposta.msg    = "Ocorreu um Erro";
        } 
        else {
            resposta.dados = retorno;
        }

        resp.json(resposta); //converte o objeto de retorno em json
    });
});

module.exports = router;