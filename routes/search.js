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

    var searchA1 = 'SELECT adultOneFirstName AS A1FN, adultOneLastName AS A1LN, mainPhone AS MP, adultOneCell AS A1C, adultOneEmail AS A1E FROM families WHERE adultOneFirstName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName AS A1FN, adultOneLastName AS A1LN, mainPhone AS MP, adultOneCell AS A1C, adultOneEmail AS A1E FROM families WHERE adultOneLastName REGEXP "' + searchString + '" ';

    var searchA2 = 'SELECT adultTwoFirstName AS A2FN, adultTwoLastName AS A2LN, mainPhone AS MP, adultTwoCell AS A2C, adultTwoEmail AS A2E FROM families WHERE adultTwoFirstName REGEXP "' + searchString + '" UNION SELECT adultTwoFirstName AS A2FN, adultTwoLastName AS A2LN, mainPhone AS MP, adultTwoCell AS A2C, adultTwoEmail AS A2E FROM families WHERE adultTwoLastName REGEXP "' + searchString + '" ';

    var searchComp = 'SELECT contactFirstName AS CFN, contactLastName AS CLN, name AS COMPANY, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE name REGEXP "' + searchString + '" UNION SELECT contactFirstName AS CFN, contactLastName AS CLN, name AS COMPANY, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE contactFirstName REGEXP "' + searchString + '" UNION SELECT name AS COMPANY, contactFirstName AS CFN, contactLastName AS CLN, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE contactLastName REGEXP "' + searchString + '" ';

    var searchChild ='SELECT adultOneFirstName AS A1FN, adultOneLastName AS A1LN, emerPhone AS EP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND lastName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName AS A1FN, adultOneLastName AS A1LN, emerPhone AS EP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND firstName REGEXP "' + searchString + '" ';


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
                console.log('rowsA1', rows);

                con.query(searchA2, function (err, rows, fields) {
                    if (err) throw err;
                    rows.forEach(checkArray);
                    console.log('rowsA2', rows);


                    con.query(searchComp, function (err, rows, fields) {
                        if (err) throw err;
                        rows.forEach(checkArray);
                        console.log('rowsComp', rows);

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
