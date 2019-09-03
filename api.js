const express       = require('express');
const bodyparser    = require('body-parser');
const cors          = require('cors');
const api           = express();
const porta         = 3000; //porta padrão
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
console.log("Run API Express");