var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var ser = require('../models/mainSearchQ');


// First you need to create a connection to the db

router.get('/', function(req, res, next) {

    var con = mysql.createConnection(db);

    var searchString = req.query.search;
    console.log("received", searchString);

    con.connect(function(err) {
       var searchResults =[];
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

        checkArray = function(elem){
            searchResults.push(elem);
        };

        runSearch = function () {

            con.query(ser.searchA1, [searchString, searchString], function (err, rows) {
                if (err) throw err;
                   rows.forEach(checkArray);

                con.query(ser.searchA2, [searchString, searchString], function (err, rows) {
                    if (err) throw err;
                    rows.forEach(checkArray);

                    con.query(ser.searchComp, [searchString, searchString, searchString], function (err, rows) {
                        if (err) throw err;
                        rows.forEach(checkArray);

                        con.query(ser.searchChild, [searchString, searchString], function (err, rows) {
                            if (err) throw err;
                            rows.forEach(checkArray);
                            con.end();
                            res.send(searchResults);
                        })
                    })
                })
            })

        };


        runSearch();

    });


});



module.exports = router;
