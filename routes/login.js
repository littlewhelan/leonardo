var express = require('express');
var router = express.Router();
var User = require('../models/user');
var validator = require('node-validator');
var regex = require('../modules/validation');
var path = require('path');

var loginCheck = validator.isObject()
	.withRequired('username', validator.isString())
	.withRequired('password', validator.isString());
// var loginCheck = validator.isObject()
// 	.withRequired('username', validator.isString({ regex: regex.username }))
// 	.withRequired('password', validator.isString({ regex: regex.password }));

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
		// console.log("after validator check", errCount, err);
		if(errCount > 0) {
			console.log("validator found errors in request", errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed validator check for login");
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
	console.log("after validator section");
	if(!res.headerSent) {
		console.log("headers haven't been sent");
		User.getAuthenticated(req.body, function (err, token) {
			if (err) {
				console.log("routes",err.message);
				return res.status(400).send(err.message);
			} else {
				console.log("token", token);
				return res.send(token);
			}
		});
	}else {
		console.log("headers have been sent");
	}
});



module.exports = router;

