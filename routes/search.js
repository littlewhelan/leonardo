var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var searchResults = [];

// First you need to create a connection to the db

router.get('/', function(req, res, next) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "littlewhelan",
        password: "DragonTattoo",
        database:"leo"
    });

    var searchString = req.query.search;
    console.log("received", searchString);

    var searchA1 = 'SELECT adultOneFirstName AS AFN, adultOneLastName AS ALN, mainPhone AS MP, adultOneCell AS AC, adultOneEmail AS AE FROM families WHERE adultOneFirstName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName AS AFN, adultOneLastName AS ALN, mainPhone AS MP, adultOneCell AS AC, adultOneEmail AS AE FROM families WHERE adultOneLastName REGEXP "' + searchString + '" ';

    var searchA2 = 'SELECT adultTwoFirstName AS AFN, adultTwoLastName AS ALN, mainPhone AS MP, adultTwoCell AS AC, adultTwoEmail AS AE FROM families WHERE adultTwoFirstName REGEXP "' + searchString + '" UNION SELECT adultTwoFirstName AS AFN, adultTwoLastName AS ALN, mainPhone AS MP, adultTwoCell AS AC, adultTwoEmail AS AE FROM families WHERE adultTwoLastName REGEXP "' + searchString + '" ';

    var searchComp = 'SELECT contactFirstName AS CFN, contactLastName AS CLN, name AS COMP, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE name REGEXP "' + searchString + '" UNION SELECT contactFirstName AS CFN, contactLastName AS CLN, name AS COMP, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE contactFirstName REGEXP "' + searchString + '" UNION SELECT name AS COMP, contactFirstName AS CFN, contactLastName AS CLN, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE contactLastName REGEXP "' + searchString + '" ';

    var searchChild ='SELECT adultOneFirstName AS CAFN, adultOneLastName AS CALN, mainPhone AS CMP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND lastName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName AS CAFN, adultOneLastName AS CALN, mainPhone AS CMP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND firstName REGEXP "' + searchString + '" ';


    con.connect(function(err) {
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

        checkArray = function(elem){
            searchResults.push(elem);
        };

        runSearch = function () {

            con.query(searchA1, function (err, rows, fields) {
                if (err) throw err;
                   rows.forEach(checkArray);

                con.query(searchA2, function (err, rows, fields) {
                    if (err) throw err;
                    rows.forEach(checkArray);

                    con.query(searchComp, function (err, rows, fields) {
                        if (err) throw err;
                        rows.forEach(checkArray);

                        con.query(searchChild, function (err, rows, fields) {
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
