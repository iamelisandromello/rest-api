const db = require('../../banco/dbConexao');

module.exports = class UsersModel {
    static getTodos(callback) {
       return db.query("SELECT * FROM users", callback);
    }

    static getId(id, callback) {
        return db.query("SELECT * FROM users WHERE id = ?", [id], callback);
     }
}