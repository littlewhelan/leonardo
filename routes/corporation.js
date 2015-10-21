var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');


// get request for one family by id
router.get('/*', function(req, res, next) {
	console.log("in get route");

	var con = mysql.createConnection(db);

	var id = req.query.id;
	console.log("received company id", id);

	con.connect(function (err) {

		var compDonations = [];

		var company = {
		companyInfo: companyInfo,
		contact: contact
		compDonations: compDonations;
		};

		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');



        runQuery = function() {

        var compDonations = [];

        		var company = {
        		companyInfo: companyInfo,
        		contact: contact
        		compDonations: compDonations;
        		};

			con.query(getPeeps.companyTab, [id], function (err, rows) {
				if(err) throw err;

					var companyInfo = {
						addressOne:rows[0].addressOne,
						addressTwo:rows[0].AddressTwo,
						zip:rows[0].Zip,
						city:rows[0].City,
						state:rows[0].State,
						phone:rows[0].Work,
						notes:rows[0].adultOneNotes,
					};

					var contact = {
						firstName:rows[0].contactFirstName,
						lastName:rows[0].contactLastName,
						email:rows[0].contactEmail,
						phone:rows[0].contactPhone,
					};


						con.query(getPeeps.compDonationsTab, [id], function (err, rows) {
						    if(err) throw err;

                                checkDonations = function(elem) {
                                     var donation = {
                                     year:elem.year,
                                     amount:element.amount
                                     };
                                        companyDonations.push(donation);
                                };

                                            rows.forEach(checkDonations);
                                                con.end();
                                                console.log('company object',company);
                                                res.send(company);

                                            })
						})
				})

		runQuery();

	});
});

// update company by id
//router.put('/', function (req, res, next) {
//	// get id sent
//	var id = req.query.id;
//	if(!id) {
//		res.status(400).send('Invalid family ID');
//	} else {
//
//	}
//	console.log("received family id", id);
//
//	var con = mysql.createConnection(db);
//
//
//	// connect, check if working
//	con.connect(function (err) {
//		if (err) {
//			console.log('Error connecting to Db');
//			return;
//		}
//		console.log('Connection established');
//	});
//});

module.exports = router;