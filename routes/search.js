var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');

// First you need to create a connection to the db

router.get('/', function(req, res, next) {

    var con = mysql.createConnection(db);

    var searchString = req.query.search;
    console.log("received", searchString);

    var searchA1 = 'SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, mainPhone AS MP, adultOneCell AS AC, adultOneEmail AS AE FROM families WHERE adultOneFirstName REGEXP ? OR adultOneLastName REGEXP ?';

    var searchA2 = 'SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, mainPhone AS MP, adultTwoCell AS AC, adultTwoEmail AS AE FROM families WHERE adultTwoFirstName REGEXP ? OR  adultTwoLastName REGEXP ?';

    var searchComp = 'SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, name AS COMP, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE name REGEXP ? OR contactFirstName REGEXP ? OR contactLastName REGEXP ?';

    var searchChild ='SELECT "child" AS type, adultOneFirstName AS CAFN, adultOneLastName AS CALN, mainPhone AS CMP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND (lastName REGEXP ? OR firstName REGEXP ?)';


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

            con.query(searchA1, [searchString, searchString], function (err, rows) {
                if (err) throw err;
                   rows.forEach(checkArray);

                con.query(searchA2, [searchString, searchString], function (err, rows) {
                    if (err) throw err;
                    rows.forEach(checkArray);

                    con.query(searchComp, [searchString, searchString, searchString], function (err, rows) {
                        if (err) throw err;
                        rows.forEach(checkArray);

                        con.query(searchChild, [searchString, searchString], function (err, rows) {
                            if (err) throw err;
                            rows.forEach(checkArray);
                            console.log('final results', searchResults);
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
