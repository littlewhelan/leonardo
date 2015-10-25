var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var ser = require('../models/createListQ');


/*GET for DB search*/
router.get('/*', function(req, res, next) {

	var con = mysql.createConnection(db);
	console.log("received from radio buttons req.query", req.query.search);

	var searchString = req.query.search;
	var type = req.query.type;
	console.log("received from radio buttons this is search", searchString,type);


//making the connection to the database


	con.connect(function (err) {
		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');

		switch(type) {

			case 'zip':

				//THIS WORKS -- get emails by zip
				con.query(ser.zipList, [searchString, searchString, searchString], function (err, rows) {
					if (err) throw err;
					console.log('Data received from Db:\n BYZIP', rows);
					con.end();
					res.send(rows);
				});

			break;

			case 'age':
				var searchResults =[];
				checkArray = function(elem){
					searchResults.push(elem);
				};

				//THIS WORKS --- will get people by age
				con.query(ser.ageList, [parseInt(searchString) - .5, parseInt(searchString) + .5], function (err, rows) {
					if (err) throw err;
					rows.forEach(checkArray);
					console.log('Data received from Db:\n BYAGE', rows);
					con.query(ser.ageList2, [parseInt(searchString) - .5, parseInt(searchString) + .5], function (err, rows) {
						if (err) throw err;
						console.log('Data received from Db:\n BYAGE', rows);
						rows.forEach(checkArray);
						console.log('Data received from Db:\n BYAGE', rows,searchResults);
						con.end();
						res.send(searchResults);
					});

				});
			break;

			case 'family':

				//THIS WORKS -- will get all families
				con.query(ser.famList, function (err, rows) {
					if (err) throw err;
					console.log('Data received from Db:\n BYFAM', rows);
					con.end();
					res.send(rows);

				});
			break;

			case 'company':

				//THIS WORKS  --will get all the companies
				con.query(ser.corpList, function (err, rows) {
					if (err) throw err;
					console.log('Data received from Db:\n BYCORP', rows);
					con.end();
					res.send(rows);

				});

			break;

		}

	});
});

module.exports 	= router;





