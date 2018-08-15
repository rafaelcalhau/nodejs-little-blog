var mysql = require('mysql');
var databaseConnection = function(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'nodejs',
        password: 'nodejs',
        database: 'nodejs_news',
        dateStrings: 'date'
    })
};

module.exports = function(){
    return databaseConnection;
};