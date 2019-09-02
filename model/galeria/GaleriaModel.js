const db = require('../../banco/dbConexao');

module.exports = class GaleriaModel {
    static getTodos(callback) {
       return db.query("SELECT * FROM galeria", callback);
    }
}