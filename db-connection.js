var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    port: '3304',
    user: 'root',
    password: '',
    database: 'eatlah_restaurant_review'
});
module.exports = connection;