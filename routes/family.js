var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');
var moment = require('moment');

// get request for one family by id
router.get('/*', function(req, res, next) {
	console.log("in get route");

	var con = mysql.createConnection(db);

	var id = req.query.id;
	console.log("received family id", id);

	con.connect(function (err) {

		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');

runQuery = function() {

					var prettyDate = "MM/DD/YYYY";
						var fullDate = "MM/DD/YYYY h:mm:ss a";
						function formatDates (date) {
							return moment(date).format(prettyDate)
						}

			con.query(getPeeps.familyTab, [id], function (err, rows) {
				if(err) throw err;

			 checkChild = function(elem) {
            		 var child = {
            		 firstName:elem.firstName,
            		 lastName:elem.lastName,
            		 email:elem.email,
            		 cell:elem.cell,
            		 birthdate:formatDates(elem.birthdate),
            		 school:elem.school
            		 };
                            childrenArray.push(child);
                            };

			checkDonations = function (elem) {
					 var donation = {
					 year:formatDates(elem.year),
					 amount:element.amount
					 };
							donationsArray.push(donation);
							};

            		var childrenArray = [];
            		var donationsArray =[];

					var adultOne = {
						firstName:rows[0].adultOneFirstName,
						lastName:rows[0].adultOneLastName,
						addressOne:rows[0].adultOneaddressOne,
						addressTwo:rows[0].adultOneAddressTwo,
						zip:rows[0].adultOneZip,
						city:rows[0].adultOneCity,
						state:rows[0].adultOneState,
						company:rows[0].adultOneCompany,
						work:rows[0].adultOneWork,
						cell:rows[0].adultOneCell,
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
						company:rows[0].adultTwoCompany,
						work:rows[0].adultTwoWork,
						cell:rows[0].adultTwoCell,
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
						phone:rows[0].emerPhone,
					};

				var family = {
            		adultOne:adultOne,
            		adultTwo:adultTwo,
            		emergency:emergency,
            		children:childrenArray,
            		donations:donationsArray
            		};
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




module.exports = router;









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

