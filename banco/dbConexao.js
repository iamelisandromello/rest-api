const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'elisandro',
    password:'12345',
    database: 'db_galeria'
});