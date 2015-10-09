var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// First you need to create a connection to the db

router.get('/', function(req, res, next) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "littlewhelan",
        password: "DragonTattoo",
        database:"leo"
    });

    con.connect(function(err) {
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

        con.query('SELECT children.firstName FROM children',function(err,rows,fields){
            console.log('You are in the query!');
            if(err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

    });



});





module.exports = router;
