var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');
var moment = require('moment');
var insertFam = require('../models/insertFam');
var updateFam = require('../models/updateFam');
var validator = require('node-validator');
var regex = require('../modules/validation');


var adultOneCheck = validator.isObject()
	.withRequired('firstName', validator.isString({ regex: regex.name }))
	.withOptional('lastName', validator.isString({ regex: regex.name}))
	.withOptional('addressOne', validator.isString({ regex: regex.address }))
	.withOptional('addressTwo', validator.isString({ regex: regex.address }))
	.withOptional('zip', validator.isString({ regex: regex.zip }))
	.withOptional('city', validator.isString({ regex: regex.city }))
	.withOptional('state', validator.isString({ regex: regex.state }))
	.withOptional('company', validator.isString({regex: regex.corpName}))
	.withOptional('work', validator.isString({ regex: regex.phone }))
	.withOptional('cell', validator.isString({ regex: regex.phone }))
	.withOptional('main', validator.isString({ regex: regex.phone }))
	.withOptional('email', validator.isString({ regex: regex.email }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var adultTwoCheck = validator.isObject()
	.withOptional('firstName', validator.isStringOrNull({ regex: regex.name }))
	.withOptional('lastName', validator.isString({ regex: regex.name}))
	.withOptional('addressOne', validator.isString({ regex: regex.address }))
	.withOptional('addressTwo', validator.isString({ regex: regex.address }))
	.withOptional('zip', validator.isString({ regex: regex.zip }))
	.withOptional('city', validator.isString({ regex: regex.city }))
	.withOptional('state', validator.isString({ regex: regex.state }))
	.withOptional('company', validator.isString({regex: regex.corpName}))
	.withOptional('work', validator.isString({ regex: regex.phone }))
	.withOptional('cell', validator.isString({ regex: regex.phone }))
	.withOptional('main', validator.isString({ regex: regex.phone }))
	.withOptional('email', validator.isString({ regex: regex.email }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var emergencyCheck = validator.isObject()
	.withOptional('firstName', validator.isStringOrNull({ regex: regex.name }))
	.withOptional('lastName', validator.isString({ regex: regex.name}))
	.withOptional('addressOne', validator.isString({ regex: regex.address }))
	.withOptional('addressTwo', validator.isString({ regex: regex.address }))
	.withOptional('zip', validator.isString({ regex: regex.zip }))
	.withOptional('city', validator.isString({ regex: regex.city }))
	.withOptional('state', validator.isString({ regex: regex.state }))
	.withOptional('phone', validator.isString({ regex: regex.phone }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var childrenCheck = validator.isObject()
	.withOptional('id', validator.isNumber())
	.withRequired('firstName', validator.isStringOrNull({ regex: regex.name}))
	.withOptional('lastName', validator.isString({ regex: regex.name}))
	.withOptional('email', validator.isString({ regex: regex.email }))
	.withOptional('cell', validator.isString({ regex: regex.phone }))
	.withOptional('birthdate', validator.isString({ regex: regex.birthdate }))
	.withOptional('notes', validator.isString({ regex: regex.notes }))
	.withOptional('school', validator.isString({ regex: regex.corpName }));

var baseFamCheck = validator.isObject()
	.withOptional('id', validator.isString({regex: /^[0-9]+$/ }))
	.withRequired('adultOne', adultOneCheck)
	.withOptional('adultTwo', adultTwoCheck)
	.withOptional('emergency', emergencyCheck)
	.withOptional('children', validator.isArray(childrenCheck))
	.withOptional('donations', validator.isArray(donationsCheck));

var donationsCheck = validator.isObject()
	.withOptional('id', validator.isNumber())
	.withRequired('amount', validator.isString({ regex: regex.amount }))
	.withRequired('date', validator.isString({ regex: regex.date }))
	.withOptional('notes', validator.isString({ regex: regex.notes }));

var idCheck = validator.isString({regex: /^[0-9]+$/ });

// get request for one family by id
router.get('/', function (req, res, next) {
	var id = req.query.id;
	// check the id to make sure it's ok
	validator.run(idCheck, id, function (errCount, err) {
		if(errCount > 0) {
			return res.sendStatus(400);
		}
	});
	console.log("in get route for family", id);

	var con = mysql.createConnection(db);

	con.connect(function (err) {

		if (err) {
			console.log('Error connecting to Db');
			return;
		}
		console.log('Connection established');

		var runQuery = function() {
			con.query(getPeeps.familyTab, [id], function (err, rows) {
				if(err) throw err;

				var checkChild = function(elem) {
					var child = {
						id:elem.id,
						firstName:elem.firstName,
						lastName:elem.lastName,
						email:elem.email,
						cell:elem.cell,
						birthdate:elem.birthdate,
						school:elem.school,
						notes:elem.notes
					};
					childrenArray.push(child);
				};

				var checkDonations = function (elem) {
					var donation = {
						id:elem.id,
						date:elem.date,
						amount:elem.amount,
						notes:elem.notes
					};
					donationsArray.push(donation);
				};

				var childrenArray = [];
				var donationsArray =[];

				var adultOne = {
					firstName:rows[0].adultOneFirstName,
					lastName:rows[0].adultOneLastName,
					addressOne:rows[0].adultOneAddressOne,
					addressTwo:rows[0].adultOneAddressTwo,
					zip:rows[0].adultOneZip,
					city:rows[0].adultOneCity,
					state:rows[0].adultOneState,
					company:rows[0].adultOneCompany,
					work:rows[0].adultOneWork,
					cell:rows[0].adultOneCell,
					main:rows[0].adultOneMain,
					email:rows[0].adultOneEmail,
					notes:rows[0].adultOneNotes
				};

				var adultTwo = {
					firstName:rows[0].adultTwoFirstName,
					lastName:rows[0].adultTwoLastName,
					addressOne:rows[0].adultTwoAddressOne,
					addressTwo:rows[0].adultTwoAddressTwo,
					zip:rows[0].adultTwoZip,
					city:rows[0].adultTwoCity,
					state:rows[0].adultTwoState,
					company:rows[0].adultTwoCompany,
					work:rows[0].adultTwoWork,
					cell:rows[0].adultTwoCell,
					main:rows[0].adultTwoMain,
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
					notes:rows[0].emerNotes

				};

				var family = {

					id:id,
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


						console.log('family object', family, " FINAL SEND");
						res.status(200).send(family);

					})
				})
			})
		};

		runQuery();

	});
});

router.post('/', function (req, res, next) {
	var family = req.body.family;
	console.log("in post route for families", family);
	// check all
	validator.run(baseFamCheck, family, function (errCount, err) {
		if (errCount != 0) {
			console.log("failed base validation", errCount, err);
			return res.sendStatus(400);
		}
		console.log("passed base check", family);

		var con = mysql.createConnection(db);

		// connect to db
		con.connect(function (err) {
			if (err) {
				console.log("Error connecting to DB");
				return res.sendStatus(400);
			}
			console.log("Connection established");
			insertFamily(family)
		});

		var insertFamily = function (family) {

			// format mainFam object
			var mainFam = {
				adultOneFirstName: family.adultOne.firstName,
				adultOneLastName: family.adultOne.lastName,
				adultOneAddressOne: family.adultOne.addressOne,
				adultOneAddressTwo: family.adultOne.addressTwo,
				adultOneZip: family.adultOne.zip,
				adultOneCity: family.adultOne.city,
				adultOneState: family.adultOne.state,
				adultOneCompany: family.adultOne.company,
				adultOneWork: family.adultOne.work,
				adultOneCell: family.adultOne.cell,
				adultOneEmail: family.adultOne.email,
				adultOneMain: family.adultOne.main,
				adultOneNotes: family.adultOne.notes,

				adultTwoFirstName: family.adultTwo.firstName,
				adultTwoLastName: family.adultTwo.lastName,
				adultTwoAddressOne: family.adultTwo.addressOne,
				adultTwoAddressTwo: family.adultTwo.addressTwo,
				adultTwoZip: family.adultTwo.zip,
				adultTwoCity: family.adultTwo.city,
				adultTwoState: family.adultTwo.state,
				adultTwoCompany: family.adultTwo.company,
				adultTwoWork: family.adultTwo.work,
				adultTwoCell: family.adultTwo.cell,
				adultTwoMain: family.adultTwo.main,
				adultTwoEmail: family.adultTwo.email,
				adultTwoNotes: family.adultTwo.notes,

				emerFirstName: family.emergency.firstName,
				emerLastName: family.emergency.lastName,
				emerAddressOne: family.emergency.addressOne,
				emerAddressTwo: family.emergency.addressTwo,
				emerZip: family.emergency.zip,
				emerCity: family.emergency.city,
				emerState: family.emergency.state,
				emerPhone: family.emergency.phone,
				emerNotes: family.emergency.notes
			};

			// run query - 1st mainFam: get the base family info in (so children can reference)
			con.query(insertFam.mainFam, [mainFam], function (err, response) {
				if (err) {
					throw err;
				}
				family.id = response.insertId;
				console.log("New family ID: ", family.id);

				// make sure there's a family ID so we don't have any orphan kids or donations
				if (family.id) {
					// check if children before inserting, or will crash
					if (family.children.length) {
						checkChildren(family.children, family.children.length, 0);
					} else if (family.donations.length) {
						// check if any donations before inserting, or will crash
						checkDonations(family.donations, family.donations.length, 0);
					} else {
						console.log("going to return ok, nothing else", family);
						con.end();
						return res.status(200).json(family);
					}
				} else {
					con.end();
					// failed to insert and/or retrieve insert id
					return res.sendStatus(400);
				}
			});
		};

		// gets called when there are children, is its own callback while there are children.
		// takes in children array, length of array, index to grab
		var checkChildren = function (children, length, index) {
			console.log("in checkChildren ", children, length, index);
			// if index is equal to length (zero-offset, so past array), then move on to donations
			if (length == index) {
				// if there are donations in the family object outside of these callbacks, then move on to donation
				if (family.donations.length) {
					checkDonations(family.donations, family.donations.length, 0);
					// no donations, send res back
				} else {
					console.log("no more children");
					con.end();
					return res.status(200).json(family);
				}
			} else {
				//console.log(children[index], " looking for index ", index);
				insertChild(children[index], checkChildren, children, length, index);
			}
		};

		// inserts new child record and runs callback
		var insertChild = function (child, cb, children, length, index) {
			child.familyID = family.id;
			con.query(insertFam.kids, [child], function (err, res) {
				if (err) {
					throw err;
				}
				family.children[index].id = res.insertId;
				console.log("inserted child ", child);
				cb(children, length, ++index);
			});
		};

		var checkDonations = function (donations, length, index) {
			// if length equal to length (zero-offset), send the response
			if (length == index) {
				con.end();
				return res.status(200).json(family);
			} else {
				insertDonation(donations[index], checkDonations, donations, length, index);
			}
		};

		var insertDonation = function (donation, cb, donations, length, index) {
			// set the familyID of the donation
			donation.familyID = family.id;
			con.query(insertFam.donations, [donation], function (err, res) {
				if (err) {
					throw err;
				}
				family.donations[index].id = res.insertId;
				family.donations[index].date = donation.date;
				cb(donations, length, ++index);
			});
		};
	})
});

router.put('/', function (req, res, next) {
	var family = req.body.family;
	// need to force id to string to pass validation, allowing either number or string var type for family id
	family.id = family.id.toString();
	console.log("In put route for families ", family);
	console.log("checking if name is null", family.adultTwo.firstName == null);
	// check all
	validator.run(baseFamCheck, family, function (errCount, err) {
		if (errCount != 0) {
			console.log("failed base validation", errCount, err);
			return res.sendStatus(400);
		}

		var con = mysql.createConnection(db);
		// connect to db
		con.connect(function (err) {
			if (err) {
				console.log("Error connecting to DB");
				return res.sendStatus(400);
			}
			console.log("Connection established");

			// first update the family - starts the process rolling
			updateFamily(family);
		});

		// updates the base family, then checks if children and/or donations, starts those threads running
		var updateFamily = function (family) {
			console.log("in update family", family);
			// create empty objects for adultOne, adultTwo, emergency if they don't exist, so can insert fine
			if (!family.adultOne) {
				family.adultOne = {};
			}
			if (!family.adultTwo) {
				family.adultTwo = {};
			}
			if (!family.emergency) {
				family.emergecny = {};
			}
			con.query(updateFam.mainFam, [family.adultOne.firstName, family.adultOne.lastName, family.adultOne.cell,
				family.adultOne.work,family.adultOne.main, family.adultOne.email, family.adultOne.company, family.adultOne.addressOne,
				family.adultOne.addressTwo, family.adultOne.city, family.adultOne.state, family.adultOne.zip, family.adultOne.notes,
				family.adultTwo.firstName, family.adultTwo.lastName, family.adultTwo.cell, family.adultTwo.work, family.adultTwo.main, family.adultTwo.email,
				family.adultTwo.company, family.adultTwo.addressOne, family.adultTwo.addressTwo, family.adultTwo.city,
				family.adultTwo.state, family.adultTwo.zip, family.adultTwo.notes,
				family.emergency.firstName, family.emergency.lastName, family.emergency.phone, family.emergency.addressOne,
				family.emergency.addressTwo, family.emergency.city, family.emergency.state, family.emergency.zip, family.emergency.notes, family.id], function (err, res) {
				if (err) {
					console.log("error updating family");
					throw err;
				}
				console.log("Updated family");
				// check if there are children. If there are, that function will carry forward checking for donations
				if (family.children) {
					checkChildren(family.children, family.children.length, 0);
					// no children, else check if donations. This function will handle the res
				} else if (family.donations) {
					checkDonations(family.donations, family.donations.length, 0);
					// no children or donations: send res
				} else {
					con.end();
					return res.status(200).json(family);
				}
			});
		};

		// gets called when there are children, is its own callback while there are children.
		// takes in children array, length of array, index to grab
		var checkChildren = function (children, length, index) {
			console.log("in checkChildren ", children, length, index);
			// if index is equal to length (zero-offset, so past array), then move on to donations
			if (length == index) {
				//if there are donations in the family object outside of these callbacks
				if (family.donations.length) {
					checkDonations(family.donations, family.donations.length, 0);
					// no donations, send res back
				} else {
					con.end();
					return res.status(200).json(family);
				}
			} else {
				//console.log(children[index], " looking for index ", index);
				// if child doesn't have an id at index, insert
				if (!children[index].id) {
					insertChild(children[index], checkChildren, children, length, index);
				} else {
					// else update child by id
					updateChild(children[index], checkChildren, children, length, index);
				}
			}
		};

		// updates existing child records and runs callback
		var updateChild = function (child, cb, children, length, index) {
			con.query(updateFam.kids, [child.firstName, child.lastName,
				child.school, child.birthdate, child.notes,
				child.email, child.cell, child.id], function (err, res) {
				if (err) {
					throw err;
				}
				family.children[index].birthdate = child.birthdate;
				console.log("Updated child ", child);
				cb(children, length, ++index);
			});
		};

		// inserts new child record and runs callback
		var insertChild = function (child, cb, children, length, index) {
			child.familyID = family.id;
			console.log("in insertChild", family, child, "len ", length, " index ", index, " of undef: ", family.children);
			con.query(insertFam.kids, [child], function (err, res) {
				if (err) {
					throw err;
				}
				// get back id of child, send back to dom
				family.children[index].id = res.insertId;
				family.children[index].birthdate = child.birthdate;
				console.log("inserted child ", child);
				cb(children, length, ++index);
			});
		};

		var checkDonations = function (donations, length, index) {
			// if length equal to length (zero-offset), send the response
			if (length == index) {
				con.end();
				return res.status(200).json(family);
			} else {
				// if donation has id, skip it - no editing
				if (donations[index].id) {
					checkDonations(donations, length, ++index);
				} else {
					insertDonation(donations[index], checkDonations, donations, length, index);
				}
			}
		};

		var insertDonation = function (donation, cb, donations, length, index) {
			// set the familyID of the donation
			family.donations[index].familyID = family.id;
			donation.familyID = family.id;
			console.log("donations", donation, donations, length, index);
			con.query(insertFam.donations, [donation], function (err, res) {
				if (err) {
					throw err;
				}
				// get back donation id, so doesn't re-insert when creating family
				family.donations[index].id = res.insertId;
				family.donations[index].date = donation.date;
				cb(donations, length, ++index);
			});
		};
	});
});

module.exports = router;