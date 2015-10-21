var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');

var getPeeps = require('../models/modalQ');



// get request for one family by id
router.get('/*', function(req, res, next) {
	console.log("in get route");

	var con = mysql.createConnection(db);

	var id = req.query.id;
	console.log("received family id", id);

	con.connect(function (err) {

		var adultOneObject =[];
		var adultTwoObject= [];
		var emergencyObject = [];
		var childrenArray = [];
		var donationsArray =[];

		var family = {
		adultOne:adultOneObject,
		adultTwo:adultTwoObject,
		emergency:emergencyObject,
		children:childrenArray,
		donations:donationsArray
		};



		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');

		 checkChild = function(elem) {
		 var child = {
		 firstName:elem.firstName,
		 lastName:elem.lastName,
		 email:elem.email,
		 cell:elem.cell,
		 birthdate:elem.birthdate
		 };

                childrenArray.push(child);

                };


		checkDonations = function(elem) {
        		 var donation = {
        		 year:elem.year,
        		 amount:element.amount
        		 };

                        donationsArray.push(donation);


                        };

runQuery = function() {

			con.query(getPeeps.familyTab, [id], function (err, rows) {
				if(err) throw err;

					var adultOne = {
						firstName:rows[0].adultOneFirstName,
						lastName:rows[0].adultOneLastName,
						addressOne:rows[0].adultOneaddressOne,
						addressTwo:rows[0].adultOneAddressTwo,
						zip:rows[0].adultOneZip,
						city:rows[0].adultOneCity,
						state:rows[0].adultOneState,
						phone:rows[0].adultOneWork,
						cellPhone:rows[0].adultOneCell,
						email:rows[0].adultOneEmail,
						notes:rows[0].adultOneNotes,
					};

					var adultTwo = {
						firstName:rows[0].adultTwoFirstName,
						lastName:rows[0].adultTwoLastName,
						addressOne:rows[0].adultTwoAddressOne,
						addressTwo:rows[0].adultTwoaddressTwo,
						zip:rows[0].adultTwoZip,
						city:rows[0].adultTwoCity,
						state:rows[0].adultTwoState,
						phone:rows[0].adultTwoWork,
						cellPhone:rows[0].adultTwoCell,
						email:rows[0].adultTwoEmail,
						notes:rows[0].adultTwoNotes,
					};

					var emergency = {
						firstName:rows[0].emerFirstName,
						lastName:rows[0].emerLastName,
						addressOne:rows[0].emerAddressOne,
						addressTwo:rows[0].emerAddressTwo,
						zip:rows[0].emerZip,
						city:rows[0].emerCity,
						state:rows[0].emerState,
						phone:rows[0].emerWork,
						email:rows[0].emerEmail,
						notes:rows[0].emerNotes,
					};

					 adultTwoObject.push(adultTwo);
					adultOneObject.push(adultOne);
					emergencyObject.push(emergency);

						console.log('adultOne',adultOne);


						con.query(getPeeps.childTab, [id], function (err, rows) {
							if(err) throw err;

								rows.forEach(checkChild);


								con.query(getPeeps.donateTab, [id], function (err, rows) {
									if(err) throw err;

										rows.forEach(checkDonations);


											con.end();


											console.log('family object',family);
											res.send(family);

								})
						})
				})
		};

		runQuery();

	});
});














// update family by id
//router.put('/', function (req, res, next) {
//	// get id sent
//	var id = req.query.id;
//	if(!id) {
//		res.status(400).send('Invalid family ID');
//	} else {
//
//	}
//	console.log("received family id", id);
//
//	var con = mysql.createConnection(db);
//
//
//	// connect, check if working
//	con.connect(function (err) {
//		if (err) {
//			console.log('Error connecting to Db');
//			return;
//		}
//		console.log('Connection established');
//	});
//});

module.exports = router;