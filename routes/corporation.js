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

		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');

runQuery = function() {


			con.query(getPeeps.companyTab, [id], function (err, rows) {
				if(err) throw err;
 				var compDonationsArray = [];

				checkDonations = function(elem) {
						 var donation = {
						 amount:elem.amount,
						 notes:elem.notes,
						 date:elem.date
						 };
							companyDonationsArray.push(donation);
					};

					var companyInfo = {
						name:rows[0].name,
						addressOne:rows[0].addressOne,
						addressTwo:rows[0].addressTwo,
						zip:rows[0].zip,
						city:rows[0].city,
						state:rows[0].state,
						phone:rows[0].phone,
						ext:rows[0].ext
					};

					var contact = {
						firstName:rows[0].contactFirstName,
						lastName:rows[0].contactLastName,
						email:rows[0].contactEmail,
						phone:rows[0].contactPhone
					};




        		var company = {
        		companyInfo: companyInfo,
        		contact: contact,
        		compDonations: compDonationsArray
        		};

						con.query(getPeeps.companyDonationsTab, [id], function (err, rows) {
						    if(err) throw err;



                                            rows.forEach(checkDonations);
                                                con.end();
                                                console.log('company object',company);
                                                res.send(company);

                                            })
						})
				};

		runQuery();

	});
});



module.exports = router;