var express = require('express');
var router = express.Router();
var User = require('../models/user');
var validator = require('node-validator');
var regex = require('../modules/validation');

var adminCheck = validator.isObject()
	.withRequired('id', validator.isString({ regex: regex.mongo }))
	.withRequired('username', validator.isString({ regex: regex.username }))
	.withRequired('change', validator.isString({ regex: regex.password }))
	.withRequired('confirmChange', validator.isString({ regex: regex.password }));

router.put('/', function(req, res, next) {
	var admin = req.body;
	console.log("/admin req.body:", req.body);

	validator.run(adminCheck, admin, function (errCount, err) {
		if (errCount > 0) {
			console.log(errCount, err);
			return res.sendStatus(400);
		}

		// take away confirm property before sending to mongo
		var user = {
			username: admin.username,
			password: admin.change
		};
		console.log("pre adjust pass ", user.password);
		User.updatePassword(user, function (postUser) {
			console.log("post adjust pass", postUser);
			User.findByIdAndUpdate(admin.id, postUser, function (err, user) {
				if (err) {
					return res.sendStatus(400);
				} else {
					return res.sendStatus(200);
				}
			});

		});
	});
});

module.exports = router;