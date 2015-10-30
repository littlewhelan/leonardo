var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var ser = require('../models/createListQ');
var validator = require('node-validator');
var regex = require('../modules/validation');

var requestCheck = validator.isObject()
	.withRequired('type', validator.isString({regex: regex.listTypes}))
	.withOptional('search', validator.isString({regex: regex.listSearch}));

/*GET for DB search*/
router.get('/', function (req, res, next) {
	//var searchString = req.query.search;
	var search = req.query.search;
	var type = req.query.type;
	console.log("received from radio buttons this is search", search, type);
	var temp = {
		type: type,
		search: search
	};

	validator.run(requestCheck, temp, function (errCount, err) {
		if (errCount > 0) {
			console.log(errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed validator");
		var con = mysql.createConnection(db);

		//making the connection to the database
		con.connect(function (err) {
			if (err) {
				console.log('Error connecting to Db');
				return;
			}
			console.log('Connection established');

			switch (temp.type) {

				case 'zip':

					//THIS WORKS -- get emails by zip
					con.query(ser.zipList, [temp.search, temp.search, temp.search], function (err, rows) {
						if (err) {
							throw err;
						}
						console.log('Data received from Db:\n BYZIP', rows);
						con.end();
						return res.send(rows);
					});

					break;

				case 'age':
					var searchResults = [];
					checkArray = function (elem) {
						searchResults.push(elem);
					};

					//THIS WORKS --- will get people by age
					con.query(ser.ageList, [parseInt(temp.search) - .5, parseInt(temp.search) + .5], function (err, rows) {
						if (err) {
							throw err;
						}
						rows.forEach(checkArray);
						console.log('Data received from Db:\n BYAGE', rows);
						con.query(ser.ageList2, [parseInt(temp.search) - .5, parseInt(temp.search) + .5], function (err, rows) {
							if (err) {
								throw err;
							}
							console.log('Data received from Db:\n BYAGE', rows);
							rows.forEach(checkArray);
							console.log('Data received from Db:\n BYAGE', rows, searchResults);
							con.end();
							return res.send(searchResults);
						});

					});
					break;

				case 'family':

					//THIS WORKS -- will get all families
					con.query(ser.famList, function (err, rows) {
						if (err) {
							throw err;
						}
						console.log('Data received from Db:\n BYFAM', rows);
						con.end();
						return res.send(rows);

					});
					break;

				case 'company':

					//THIS WORKS  --will get all the companies
					con.query(ser.corpList, function (err, rows) {
						if (err) {
							throw err;
						}
						console.log('Data received from Db:\n BYCORP', rows);
						con.end();
						return res.send(rows);

					});

					break;

			}

		});
	});


});

module.exports = router;





