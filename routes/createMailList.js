var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var ser = require('../models/createListQ');

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



//making the connection to the database

    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

//choosing which situation is true for creating the mailing list
//donors is selected from the list

        if() {
        var searchString = req.query.search;
        console.log("received", searchString);

        con.query(,function(err,rows) {

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

//families is selected from the list

        } else if () {

        //this will get all family adult emails
        con.query(, function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

//selecting all emails with the same zip code

        } else if () {
        //selects all adults email by zip code as well as company by zip
        con.query(, function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });
} else if() {
//selects all emails based on age of the child
        con.query(, function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

};

    });

});


module.exports = router;