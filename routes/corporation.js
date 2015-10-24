var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');
var moment = require('moment');
var insertCorp = require('../models/insertCorp');
var updateCorp = require('../models/updateCorp');

// get request for one family by id
router.get('/', function (req, res, next) {
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

		runQuery = function () {

			var prettyDate = "MM/DD/YYYY";

			function formatDates(date) {
				return moment(date).format(prettyDate)
			}

			con.query(getPeeps.companyTab, [id], function (err, rows) {
				if (err) {
					throw err;
				}
				var companyDonationsArray = [];

				var checkDonations = function (elem) {
					var donation = {
						amount: elem.amount,
						notes: elem.notes,
						date: formatDates(elem.date)
					};
					companyDonationsArray.push(donation);
				};

				var companyInfo = {
					name: rows[0].name,
					addressOne: rows[0].addressOne,
					addressTwo: rows[0].addressTwo,
					zip: rows[0].zip,
					city: rows[0].city,
					state: rows[0].state,
					phone: rows[0].phone,
					notes: rows[0].notes,
					email: rows[0].email
				};

				var contactInfo = {
					firstName: rows[0].contactFirstName,
					lastName: rows[0].contactLastName,
					email: rows[0].contactEmail,
					phone: rows[0].contactPhone,
					ext: rows[0].contactExt
				};

				var company = {
					companyInfo: companyInfo,
					contact: contactInfo,
					donations: companyDonationsArray
				};

				con.query(getPeeps.companyDonationsTab, [id], function (err, rows) {
					if (err) {
						throw err;
					}


					rows.forEach(checkDonations);
					con.end();
					console.log('company object', company);
					res.send(company);

				})
			})
		};

		runQuery();

	});
});

router.post('/', function (req, res, next) {
	console.log("in post route for corps", req.body.corp);
	if (!req.body.corp) {
		res.status(400).send("Corp not sent");
	}

	var corp = req.body.corp;

	var con = mysql.createConnection(db);

	con.connect(function (err) {
		if (err) {
			console.log("Error connecting to DB");
			res.status(400);
		}
		console.log("Connection Established");

		insertCorporation(corp);
	});

	var insertCorporation = function (corp) {

		// format corp for insertion
		var newCorp = {
			name: corp.info.name,
			addressOne: corp.info.addressOne,
			addressTwo: corp.info.addressTwo,
			city: corp.info.city,
			state: corp.info.state,
			zip: corp.info.phone,
			contactFirstName: corp.contact.firstName,
			contactLastName: corp.contact.lastName,
			contactPhone: corp.contact.phone,
			contactEmail: corp.contact.email,
			contactExt: corp.contact.ext,
			contactNotes: corp.contact.notes
		};
		console.log("insertCorporation ", newCorp);
		con.query(insertCorp.corp, newCorp, function (err, res) {
			if(err) {
				con.end();
				throw err;
			}
			corp.id = res.insertId;
			console.log("New corp ID: ", corp.id);

			// make sure there's a corp id, so no orphan donations
			if (corp.id) {
				// check for donations so forEach won't crash app
				if (corp.donations) {
					checkDonations(corp.donations, corp.donations.length, 0);
				} else {
					con.end();
					res.status(200).json({id: corp.id});
				}
			} else {
				con.end();
				// failed to insert and/or retrieve insert id
				res.status(400);
			}
		});
	};

	var checkDonations = function (donations, length, index) {
		console.log("In checkDonations", donations, length, index);
		// if length equal to length (zero-offset), send the response
		if (length == index) {
			con.end();
			res.status(200).json(corp);
		} else {
			// if donation has id, skip it - no editing
			if (donations[index].id) {
				checkDonations(donations, length, ++index);
			} else {
				insertDonation(donations[index], checkDonations, donations, length, index);
			}
		}
	};


	var insertDonation = function (donation, cb, donations, length, index) {
		donation.donorID = corp.id;
		con.query(insertCorp.donations, [donation], function (err, res) {
			if (err) {
				con.end();
				throw err;
			}
			donations[index].id = res.insertId;
			cb(donations, length, ++index);
		});
	};
});


router.put('/', function (req, res, next) {
	console.log("In put route for corps", req.body.corp);

	// kick out error if no id sent for update - new corps should be posted
	if (!req.body.corp || !req.body.corp.id) {
		res.status(400).send("No corp id");
	}

	var corp = req.body.corp;
	var con = mysql.createConnection(db);
	console.log("before connect");
	con.connect(function (err) {
		if (err) {
			console.log("Error connecting to DB");
			res.status(400);
		}
		console.log("Connection established");

		updateCorporation(corp);
	});

	var updateCorporation = function (corp) {
		console.log("In corp update ", corp);

		con.query(updateCorp.corp, [corp.info.name, corp.info.addressOne, corp.info.addressTwo,
			corp.info.city, corp.info.state, corp.info.zip, corp.info.phone, corp.info.notes, corp.contact.firstName,
			corp.contact.lastName, corp.contact.phone, corp.contact.email,
			corp.contact.ext, corp.contact.notes, corp.id], function (err, res) {
			if (err) {
				con.end();
				console.log("error updating corp");
				throw err;
			}
			console.log("updated corp");

			// check if donations, so forEach doesn't crash app
			if (corp.donations) {
				checkDonations(corp.donations, corp.donations.length, 0);
			}else {
				con.end();
				res.status(200).json(corp);
			}
		});
	};

	var checkDonations = function (donations, length, index) {
		// while index is lower than length, continue, else end
		if (length == index) {
			con.end();
			res.status(200).json(corp);
		} else {
			// check if has id - if not, then insert
			if (!donations[index].id) {
				insertDonation(donations[index], checkDonations, donations, length, index);
			} else {
				// else continue, to check other donations
				checkDonations(donations, length, ++index);
			}
		}
	};

	var insertDonation = function (donation, cb, donations, length, index) {
		donation.donorID = corp.id;
		con.query(insertCorp.donations, [donation], function (err, res) {
			if (err) {
				con.end();
				throw err;
			}
			cb(donations, length, ++index);
		});
	};
});

module.exports = router;