var express = require('express');
var router = express.Router();
// var User = require('../models/user');
var user = require('../models/user');
var mysql = require('mysql');
var db = require('../config/db.js');
var validator = require('node-validator');
var regex = require('../modules/validation');

var adminCheck = validator.isObject()
	.withRequired('username', validator.isString({ regex: regex.username }))
	.withRequired('password', validator.isString({ regex: regex.password }))
	.withRequired('confirm', validator.isString({ regex: regex.password }))

/* POST /register/ */
router.post('/', function(req, res, next) {
    var temp = req.body;
	console.log("/register req.body:", temp);
	validator.run(adminCheck, temp, function (errCount, err) {
		if(errCount > 0) {
			return res.sendStatus(400);
		}
		var hashed = user.hashPass(temp.password);
		if(!hashed) {
			return res.status(500).send('Error creating user');
		}
		temp.password = hashed;

		var con = mysql.createConnection(db);
		con.connect(function (err) {

			if (err) {
				console.log('Error connecting to Db');
				console.error(err);
				return res.status(500).send('Error connecting to database');
			}
			console.log('Connection established');

			con.query(user.insert, temp, function (err, rows) {
				if(err) throw err;
				return res.status(200).send('User created');
			});
		});
		// User.Create(req.body, function(err, user){
		// 	if(err){
		// 		return res.status(400).send(err.message);
		// 	} else{
		// 		return res.sendStatus(200);
		// 	}
		// });
	});
});

module.exports = router;