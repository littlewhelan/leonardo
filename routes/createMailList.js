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

        //this is to get all the contact emails
        con.query('SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, contactEmail AS CE FROM corpDonors',function(err,rows) {


            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

        //this will get all family adult emails
        con.query('SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, adultOneEmail AS AE FROM families UNION SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, adultTwoEmail AE FROM families', function (err, rows) {
            console.log('You are in the query!');

            if (err) throw err;
            console.log('Data received from Db:\n');
            console.log(rows);
            con.end();
            res.send(rows);
        });

//selects all adults email by zip code as well as company by zip
        con.query('SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, adultOneEmail AS AE FROM families WHERE adultOneZip = "' + searchString + '" UNION SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, adultTwoEmail AS AE FROM families WHERE adultTwoZip = "' + searchString + '" UNION SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, contactEmail AS CE FROM corpDonors WHERE Zip = "' + searchString + '"  ', function (err, rows) {
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