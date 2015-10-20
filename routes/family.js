var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');


// get request for one family by id
router.get('/*', function(req, res, next) {
	console.log("in get route");

	var con = mysql.createConnection(db);

	// get id sent
	var id = req.query.id;
	console.log("received family id", id);

	// connect, check if working
	con.connect(function (err) {
		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});

	// run queries
	var family = {};
	// first get family main info
	con.query(getPeeps.familyTab, [id], function (err, rows) {
		if(err) {
			throw err;
		}else {
			console.log('Data received from Db:\n');
			console.log(rows);
			// process the adult 1, adult 2, emergency contact into objects within the family object
			var adultOne = {
			firstName: rows.adultOneFirstName
			};

		}
	});

	// second get children info
	con.query(getPeeps.childTab, [id], function (err, rows) {
		if(err) {
			throw err;
		}else {
			console.log('Data received from Db:\n');
			console.log(rows);
			// process the children, pushing children objects to an array
		}
	});

	// third get family donation info
	con.query(getPeeps.compTab, [id], function (err, rows) {
		if(err) {
			throw err;
		}else {
			console.log('Data received from Db:\n');
			console.log(rows);
			// process the donations, pushing donation objects to an array
		}
	});

	// end the connection and send the combined family unit
	con.end();

	res.send(family);
	console.log(adultOne);


});

// update family by id
router.put('/', function (req, res, next) {
	// get id sent
	var id = req.query.id;
	if(!id) {
		res.status(400).send('Invalid family ID');
	} else {

	}
	console.log("received family id", id);

	var con = mysql.createConnection(db);


	// connect, check if working
	con.connect(function (err) {
		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');
	});
});

module.exports = router;