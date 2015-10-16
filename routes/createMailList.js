var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');



/*POST new contact list */
//router.post('/', function(req, res, next) {
//    //res.sendFile(path.join(__dirname,'../index.html'));
//    res.send('This is the create Mail List Route');
//});

/*POST*/
router.post('/*', function(req, res, next) {
    res.render('index');
});

    /*GET for DB search*/
router.get('/', function(req, res, next) {

    var con = mysql.createConnection(db);

    var searchString = req.query.search;
    console.log("received", searchString);

    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');


        con.query('SELECT contactFirstName AS CFN, contactLastName, contactEmail FROM corpDonors',function(err,rows,fields) {

            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

        con.query('SELECT adultOneFirstName,adultOneLastName, adultOneEmail FROM families UNION SELECT adultTwoFirstName, adultTwoLastName, adultTwoEmail FROM families', function (err, rows, fields) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });


        con.query('SELECT adultOneFirstName,adultOneLastName, adultOneEmail FROM families WHERE adultOneZip = "' + searchString + '" UNION SELECT adultTwoFirstName,adultTwoLastName, adultTwoEmail FROM families WHERE adultTwoZip = "' + searchString + '"  ', function (err, rows, fields) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });


    });

});


module.exports = router;