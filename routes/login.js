var express = require('express');
var router = express.Router();
var User = require('../models/user');
var validator = require('node-validator');
var regex = require('../modules/validation');

var loginCheck = validator.isObject()
	.withRequired('username', validator.isString({ regex: regex.username }))
	.withRequired('password', validator.isString({ regex: regex.password }));

/* POST /api/register/ */
router.post('/', function (req, res, next) {
	var login = req.body;
	validator.run(loginCheck, login, function (errCount, err) {
		if(errCount > 0) {
			console.log(errCount, err);
			return res.sendStatus(400);
		}
		User.getAuthenticated(req.body, function (err, token) {
			if (err) {
				console.log("routes",err.message);
				res.status(400).send(err.message);
			} else {
				console.log("token", token);
				res.send(token);
			}
		});
	});

});



module.exports = router;

