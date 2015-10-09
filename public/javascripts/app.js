var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : ' littlewhelan',
    password : ' DragonTattoo ',
    database : 'leo'
});

connection.connect();

connection.query('SELECT * FROM children', function(err, rows) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});

connection.end();