var mysql = require('mysql');
var databaseConnection = function(){
    return mysql.createConnection({
        host: 'localhost',
        user: '',
        password: '',
        database: '',
        dateStrings: 'date'
    })
};

module.exports = function(){
    return databaseConnection;
};