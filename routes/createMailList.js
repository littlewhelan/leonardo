var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var ser = require('../models/createListQ');


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

       if(donorList == true) {
        con.query(donorList, function(err,rows) {

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

//families is selected from the list

        } else if (familyList == true) {

        //this will get all family adult emails
        con.query(familyList, function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

//selecting all emails with the same zip code

        } else if (zipList == true) {
        //selects all adults email by zip code as well as company by zip

       var searchString = req.query.search;
       console.log("received", searchString);

        con.query(zipList, [searchString], function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });
        } else if (ageList == true) {

//selects all emails based on age of the child


        con.query(ageList,[searchString], function (err, rows) {
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