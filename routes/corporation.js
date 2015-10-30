var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');
var moment = require('moment');
var insertCorp = require('../models/insertCorp');
var updateCorp = require('../models/updateCorp');
var validator = require('node-validator');
var regex = require('../modules/validation');

var infoCheck = validator.isObject()
	.withRequired('name', validator.isString({ regex: regex.name }))
	.withOptional('addressOne', validator.isString({ regex: regex.address }))
	.withOptional('addressTwo', validator.isString({ regex: regex.address }))
	.withOptional('zip', validator.isString({ regex: regex.zip }))
	.withOptional('city', validator.isString({ regex: regex.city }))
	.withOptional('state', validator.isString({ regex: regex.state }))
	.withOptional('phone', validator.isString({ regex: regex.phone }))
	.withOptional('notes', validator.isString({ regex: regex.notes }))
	.withOptional('email', validator.isString({ regex: regex.email }));

var contactCheck = validator.isObject()
	.withOptional('firstName', validator.isString({ regex: regex.name }))
	.withOptional('lastName', validator.isString({ regex: regex.name }))
	.withOptional('email', validator.isString({ regex: regex.email }))
	.withOptional('phone', validator.isString({ regex: regex.phone }))
	.withOptional('ext', validator.isString({ regex: regex.ext }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var donationsCheck = validator.isObject()
	.withRequired('amount', validator.isString({ regex: regex.amount }))
	.withRequired('date', validator.isString({ regex: regex.date }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var baseCorpCheck = validator.isObject()
	.withOptional('id', validator.isInteger())
	.withRequired('info', infoCheck)
	.withOptional('contact', contactCheck)
	.withOptional('donations', validator.isArray(donationsCheck));

var idCheck = validator.isString({regex: /^[0-9]+$/ });

// get request for one family by id
	router.get('/', function (req, res, next) {
		var id = req.query.id;
		console.log('id', id, typeof id);
		// check the id to make sure it's ok
		validator.run(idCheck, id, function (errCount, err) {
			if(errCount > 0) {
				console.log(errCount, err);
				return res.sendStatus(400);
			}
		});
		console.log("in get route");

	var con = mysql.createConnection(db);

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

				var info = {
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

				var contact = {
					firstName: rows[0].contactFirstName,
					lastName: rows[0].contactLastName,
					email: rows[0].contactEmail,
					phone: rows[0].contactPhone,
					ext: rows[0].contactExt,
					notes: rows[0].contactNotes
				};

				var company = {
					id: id,
					info: info,
					contact: contact,
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

//router.post('/', [validator.express(baseCorpCheck), function (req, res, next) {
router.post('/', function (req, res, next) {
	var corp = req.body.corp;
	console.log("in post route for corps", corp);

	// check all
	validator.run(baseCorpCheck, corp, function (errCount, err) {
		if(errCount != 0) {
			console.log("failed base validation", errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed base check", corp);
		var con = mysql.createConnection(db);

		con.connect(function (err) {
			if (err) {
				console.log("Error connecting to DB");
				return res.sendStatus(400);
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
			con.query(insertCorp.corp, newCorp, function (err, result) {
				if(err) {
					con.end();
					throw err;
				}
				corp.id = result.insertId;
				console.log("New corp ID: ", corp.id);

				// make sure there's a corp id, so no orphan donations
				if (corp.id) {
					// check for donations so forEach won't crash app
					if (corp.donations) {
						checkDonations(corp.donations, corp.donations.length, 0);
					} else {
						con.end();
						return res.status(200).json({id: corp.id});
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
				return res.status(200).json(corp);
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
			con.query(insertCorp.donations, [donation], function (err, result) {
				if (err) {
					con.end();
					throw err;
				}
				donations[index].id = result.insertId;
				cb(donations, length, ++index);
			});
		};
	});
});


router.put('/', function (req, res, next) {
	var corp = req.body.corp;
	console.log("In put route for corps", corp);

	// check all
	validator.run(baseCorpCheck, corp, function (errCount, err) {
		if (errCount != 0) {
			console.log("failed base validation", errCount, err);
			return res.sendStatus(400);
		}

		var con = mysql.createConnection(db);
		console.log("before connect");
		con.connect(function (err) {
			if (err) {
				console.log("Error connecting to DB");
				return res.sendStatus(400);
			}
			console.log("Connection established");

			updateCorporation(corp);
		});

		var updateCorporation = function (corp) {
			console.log("In corp update ", corp);

			con.query(updateCorp.corp, [corp.info.name, corp.info.addressOne, corp.info.addressTwo,
				corp.info.city, corp.info.state, corp.info.zip, corp.info.phone, corp.info.notes, corp.contact.firstName,
				corp.contact.lastName, corp.contact.phone, corp.contact.email,
				corp.contact.ext, corp.contact.notes, corp.id], function (err, result) {
				if (err) {
					con.end();
					console.log("error updating corp");
					throw err;
				}
				console.log("updated corp");

				// check if donations, so forEach doesn't crash app
				if (corp.donations) {
					checkDonations(corp.donations, corp.donations.length, 0);
				} else {
					con.end();
					return res.status(200).json(corp);
				}
			});
		};

		var checkDonations = function (donations, length, index) {
			// while index is lower than length, continue, else end
			if (length == index) {
				con.end();
				return res.status(200).json(corp);
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
			con.query(insertCorp.donations, [donation], function (err, result) {
				if (err) {
					con.end();
					throw err;
				}
				donations[index].id = result.insertId;
				cb(donations, length, ++index);
			});
		};
	});
});

module.exports = router;