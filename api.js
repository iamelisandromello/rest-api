const express       = require('express');
const bodyparser    = require('body-parser');
const cors          = require('cors');
const api           = express();
const porta         = normalizePort(process.env.PORT || '3000'); // function de normatização da porta
const router        = express.Router();
const galeriaRouter = require('./router/galeriaRouter');
const usersRouter   = require('./router/usersRouter');

api.use(cors());
//configurando o body parser para pegar POSTS mais tarde
api.use(bodyparser.urlencoded({extended: true}));   

router.get("/", (req, resp) => resp.json({
    mensagem: '=>API online...'
}));

api.use("/", router);               // Rota Default
api.use("/galeria", galeriaRouter); // Rota para Galeria
api.use("/users", usersRouter);     // Rota para Galeria

api.listen(porta);
api.on('error', onError);           //Função de Tratamento de erros
console.log("Run API Express");

function normalizePort(val) {
    const port  = parseInt (val, 10);

    if(isNaN(port)) {
        return val;
    }

    if(port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }

    const bind  = typeof porta === 'string' ?
        'Pipe ' + port :
        'Pipe ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privilege');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already  in use');
            process.exit(1);
            break;
        default:
            throw error;
    }

}