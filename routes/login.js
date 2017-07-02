var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
// var User = require('../models/user');
var user = require('../models/user');
var validator = require('node-validator');
var regex = require('../modules/validation');
var path = require('path');

// var loginCheck = validator.isObject()
// 	.withRequired('username', validator.isString())
// 	.withRequired('password', validator.isString());
var loginCheck = validator.isObject()
	.withRequired('username', validator.isString({ regex: regex.username }))
	.withRequired('password', validator.isString({ regex: regex.password }));

router.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../public/static/login.html'));
});

/* POST /api/register/ */
router.post('/', function (req, res, next) {
	var login = req.body;
	// User.getAuthenticated(req.body, function (err, token) {
	// 	if (err) {
	// 		console.log("routes",err.message);
	// 		res.status(400).send(err.message);
	// 	} else {
	// 		console.log("token", token);
	// 		res.send(token);
	// 	}
	// });
	console.log("In login post route", login);
	validator.run(loginCheck, login, function (errCount, err) {
		console.log("after validator check (in callback)", errCount, err);
		if(errCount > 0) {
			console.log("validator found errors in request", errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed validator check for login");
		return true;
		// User.getAuthenticated(req.body, function (err, token) {
		// 	if (err) {
		// 		console.log("routes",err.message);
		// 		res.status(400).send(err.message);
		// 	} else {
		// 		console.log("token", token);
		// 		res.send(token);
		// 	}
		// });
	});
	console.log("after validator section", res.headersSent);
	if(!res.headersSent) {
		console.log("headers haven't been sent");
		var con = mysql.createConnection(db);
		con.connect(function (err) {

			if (err) {
				console.log('Error connecting to Db');
				console.error(err);
				return res.status(500).send('Error connecting to database');
			}
			console.log('Connection established');

			con.query(user.select, [login.username], function (err, rows) {
				if(err) throw err;
				var loginCallback = function (err, results) {
					console.log("test validated user", res.headersSent, results);
					if(err) return next(err);
					return res.status(200).send(results);
				};
				// add user id from db for generating token
				login.id = rows[0].id;
				// sample hash: $2a$12$YrxPGKURkOh8iad.JDmkCOhPPFbo0qrMMIypKaso8N6HytGB0cfSu
				user.validateUser(login, rows[0].password, loginCallback)
			});
		});

		// User.getAuthenticated(req.body, function (err, token) {
		// 	if (err) {
		// 		console.log("routes",err.message);
		// 		return res.status(400).send(err.message);
		// 	} else {
		// 		console.log("token", token);
		// 		return res.send(token);
		// 	}
		// });
			} else {
		console.log("headers have been sent");
			}
		});



module.exports = router;

