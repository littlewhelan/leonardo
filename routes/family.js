var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
//var getFam = require('../models/getFam');
//var getKids = require('../models/getKids');
//var getDon = require('../models/getDon');

// get request for one family by id
router.get('/', function(req, res, next) {

	var con = mysql.createConnection(db);

	// get id sent
	var id = req.query.search;
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
	con.query(getFam, id, function (err, rows) {
		if(err) {
			throw err;
		}else {
			console.log('Data received from Db:\n');
			console.log(rows);
			// process the adult 1, adult 2, emergency contact into objects within the family object
		}
	});

	// second get children info
	con.query(getKids, id, function (err, rows) {
		if(err) {
			throw err;
		}else {
			console.log('Data received from Db:\n');
			console.log(rows);
			// process the children, pushing children objects to an array
		}
	});

	// third get family donation info
	con.query(getDon, id, function (err, rows) {
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

});

// update family by id
router.put('/', function (req, res, next) {
	// get id sent
	var id = req.query.search;
	if(!id) {
		res.status(400).send('Invalid family ID');
	}else {

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