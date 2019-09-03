const db = require('../../banco/dbConexao');

module.exports = class UsersModel {
    static getTodos(callback) {
       return db.query("SELECT * FROM users", callback);
    }

    static getId(id, callback) {
        //return db.query("SELECT * FROM users WHERE id = ?", [id], callback);
        let filter = '';
        if(id) filter = ' WHERE ID=' + parseInt(id); //parseInt é uma proteção contra SQL Injection, o ID deve ser um inteiro válido
        return db.query('SELECT * FROM users' + filter, callback);        
     }
}