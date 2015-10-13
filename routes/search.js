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

    var searchString = req.query.search;
    console.log("received", searchString);

    con.connect(function(err) {
        if(err){
            console.log('Error connecting to Db');
            return;
        }
        console.log('Connection established');

        con.query('SELECT adultOneFirstName, adultOneLastName, mainPhone, adultOneCell, adultOneEmail FROM families                WHERE adultOneFirstName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName, adultOneLastName, mainPhone, adultOneCell, adultOneEmail FROM families WHERE adultOneLastName REGEXP "' + searchString + '" UNION SELECT adultTwoFirstName, adultTwoLastName, mainPhone, adultTwoCell, adultTwoEmail FROM families WHERE adultTwoFirstName REGEXP "' + searchString + '" UNION SELECT adultTwoFirstName, adultTwoLastName, mainPhone, adultTwoCell, adultTwoEmail FROM families WHERE adultTwoLastName REGEXP "' + searchString + '" UNION SELECT contactFirstName, contactLastName, name, contactPhone, contactEmail FROM corpDonors WHERE name REGEXP "' + searchString + '" UNION SELECT contactFirstName, contactLastName, name, contactPhone, contactEmail FROM corpDonors WHERE contactFirstName REGEXP "' + searchString + '" UNION SELECT name, contactFirstName, contactLastName, contactPhone, contactEmail FROM corpDonors WHERE contactLastName REGEXP "' + searchString + '" UNION SELECT adultOneFirstName, adultOneLastName, emerPhone, firstName, lastName FROM families f, children c WHERE f.id = c.familyID AND lastName REGEXP "' + searchString + '" UNION SELECT f.adultOneFirstName, f.adultOneLastName, f.emerPhone, c.firstName, c.lastName FROM families f, children c WHERE f.id = c.familyID AND firstName REGEXP "' + searchString + '" UNION SELECT firstName, lastName, email, phone, null FROM individualDonors WHERE firstName REGEXP "' + searchString + '" UNION SELECT firstName, lastName, email, phone, null FROM individualDonors WHERE lastName REGEXP "' + searchString + '" ',function(err,rows,fields) {
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
