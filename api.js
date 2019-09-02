const express       = require('express');
const bodyparser    = require('body-parser');
const cors          = require('cors');
const api           = express();
const porta         = 3000;
const router        = express.Router();
const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));

router.get("/", (req, resp) => resp.json({
    mensagem: 'API online...'
}));

api.use("/", router);               // Rota Default
api.use("/galeria", galeriaRouter); // Rota para Galeria
api.listen(porta);
console.log("Run API Express");