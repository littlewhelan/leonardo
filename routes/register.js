var express = require('express');
var router = express.Router();
var User = require('../models/user');
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

		User.Create(req.body, function(err, user){
			if(err){
				return res.status(400).send(err.message);
			} else{
				return res.sendStatus(200);
			}
		});
	});
});

module.exports = router;