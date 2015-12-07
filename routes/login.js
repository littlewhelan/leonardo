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
	console.log("post received, checking ", login);
	console.log("testing", regex.username.test(login.username), regex.password.test(login.password));
	validator.run(loginCheck, login, function (errCount, err) {
		if(errCount > 0) {
			console.log("error - validator: ", errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed validation");
		User.getAuthenticated(login, function (err, token) {
			if (err) {
				console.log("routes",err.message);
				return res.status(400).send(err.message);
			} else {
				console.log("token", token);
				return res.send(token);
			}
		});
	});
});



module.exports = router;

