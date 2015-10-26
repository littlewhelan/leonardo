var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../config/db.js');
var getPeeps = require('../models/modalQ');
var moment = require('moment');
var insertFam = require('../models/insertFam');
var updateFam = require('../models/updateFam');

// get request for one family by id
router.get('/', function (req, res, next) {
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

		var runQuery = function() {

			var prettyDate = "MM/DD/YYYY";
			function formatDates (date) {
				return moment(date).format(prettyDate)
			}

			con.query(getPeeps.familyTab, [id], function (err, rows) {
				if(err) throw err;

				var checkChild = function(elem) {
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

				var checkDonations = function (elem) {
					var donation = {
						date:formatDates(elem.date),
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
					notes:rows[0].adultOneNotes,
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
					//notes:rows[0].emerNotes,

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

router.post('/', function (req, res, next) {
	console.log("in post route for families", req.body.family);
	if(!req.body.family) {
		res.status(400).send("Family not sent");
	}
	// stores the whole family unit (needs to be split for queries)
	var family = req.body.family;

	var con = mysql.createConnection(db);

	// connect to db
	con.connect(function (err) {
		if(err) {
			console.log("Error connecting to DB");
			res.status(400);
		}
		console.log("Connection established");
		insertFamily(family)
	});

	var prettyDate = "YYYY-MM-DD";
	var fullDate = "MM/DD/YYYY h:mm:ss a";

	function formatDates(date) {
		return moment(date).format(prettyDate)
	}

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
			emerNotes:family.emergency.notes
		};

		// run query - 1st mainFam: get the base family info in (so children can reference)
		con.query(insertFam.mainFam, [mainFam], function (err, response) {
			if(err) {
				throw err;
			}
			family.id = response.insertId;
			console.log("New family ID: ", family.id);

			// make sure there's a family ID so we don't have any orphan kids or donations
			if(family.id) {
				// check if children before inserting, or will crash
				if(family.children.length) {
					checkChildren(family.children, family.children.length, 0);
				}else if(family.donations.length) {
				// check if any donations before inserting, or will crash
					checkDonations(family.donations, family.donations.length, 0);
				} else {
					console.log("going to return ok, nothing else", family);
					con.end();
					res.status(200).json(family);
				}
			}else {
				con.end();
				// failed to insert and/or retrieve insert id
				res.status(400);
			}
		});
	};

	// gets called when there are children, is its own callback while there are children.
	// takes in children array, length of array, index to grab
	var checkChildren = function (children, length, index) {
		console.log("in checkChildren ", children, length, index);
		// if index is equal to length (zero-offset, so past array), then move on to donations
		if(length == index) {
			// if there are donations in the family object outside of these callbacks, then move on to donation
			if(family.donations.length) {
				checkDonations(family.donations, family.donations.length, 0);
				// no donations, send res back
			} else {
				console.log("no more children");
				con.end();
				res.status(200).json(family);
			}
		}else {
			//console.log(children[index], " looking for index ", index);
			insertChild(children[index], checkChildren, children, length, index);
		}
	};

	// inserts new child record and runs callback
	var insertChild = function (child, cb, children, length, index) {
		child.familyID = family.id;
		con.query(insertFam.kids, [child], function (err, res) {
			if(err) {
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
			res.status(200).json(family);
		} else {
			insertDonation(donations[index], checkDonations, donations, length, index);
		}
	};

	var insertDonation = function (donation, cb, donations, length, index) {
		// set the familyID of the donation
		donation.familyID = family.id;
		donation.date = formatDates(donation.date);
		con.query(insertFam.donations, [donation], function (err, res) {
			if(err) {
				throw err;
			}
			family.donations[index].id = res.insertId;
			family.donations[index].date = donation.date;
			cb(donations, length, ++index);
		});
	};
});

router.put('/', function (req, res, next) {
	console.log("in put route for families", req.body.family);

	// kick out error if no id sent for update - new families should be posted
	if(!req.body.family || !req.body.family.id) {
		res.status(400).send("No family id");
	}
	// stores the whole family unit (needs to be split for queries)
	var family = req.body.family;
	var con = mysql.createConnection(db);
	var prettyDate = "YYYY-MM-DD";
	function formatDates(date) {
		return moment(date).format(prettyDate)
	}
	// connect to db
	con.connect(function (err) {
		if(err) {
			console.log("Error connecting to DB");
			res.status(400);
		}
		console.log("Connection established");

		// first update the family - starts the process rolling
		updateFamily(family);
	});

	// updates the base family, then checks if children and/or donations, starts those threads running
	var updateFamily = function (family) {
		console.log("in update family", family);
		// if there aren't any adults in family, reject it
		if(!(family.adultOne && family.adultTwo)) {
			res.status(400).send("No adults in family");
		}
		// create empty objects for adultOne, adultTwo, emergency if they don't exist, so can insert fine
		if(!family.adultOne) {
			family.adultOne = {};
		}
		if(!family.adultTwo) {
			family.adultTwo = {};
		}
		if(!family.emergency) {
			family.emergecny = {};
		}
		con.query(updateFam.mainFam, [family.adultOne.firstName, family.adultOne.lastName, family.adultOne.cell,
			family.adultOne.work, family.adultOne.email, family.adultOne.company, family.adultOne.addressOne,
			family.adultOne.addressTwo, family.adultOne.city, family.adultOne.state, family.adultOne.zip, family.adultOne.notes,
			family.adultTwo.firstName, family.adultTwo.lastName, family.adultTwo.cell, family.adultTwo.work, family.adultTwo.email,
			family.adultTwo.company, family.adultTwo.addressOne, family.adultTwo.addressTwo, family.adultTwo.city,
			family.adultTwo.state, family.adultTwo.zip, family.adultTwo.notes,
			family.emergency.firstName, family.emergency.lastName, family.emergency.phone, family.emergency.addressOne,
			family.emergency.addressTwo, family.emergency.city, family.emergency.state, family.emergency.zip,
			family.mainPhone, family.id], function (err, res) {
			if (err) {
				console.log("error updating family");
				throw err;
			}
			console.log("Updated family");
			// check if there are children. If there are, that function will carry forward checking for donations
			if(family.children) {
				checkChildren(family.children, family.children.length, 0);
				// no children, else check if donations. This function will handle the res
			}else if(family.donations) {
				checkDonations(family.donations, family.donations.length, 0);
				// no children or donations: send res
			} else {
				con.end();
				res.status(200).json(family);
			}
		});
	};

	// gets called when there are children, is its own callback while there are children.
	// takes in children array, length of array, index to grab
	var checkChildren = function (children, length, index) {
		console.log("in checkChildren ", children, length, index);
		// if index is equal to length (zero-offset, so past array), then move on to donations
		if(length == index) {
			//if there are donations in the family object outside of these callbacks
			if(family.donations.length) {
				checkDonations(family.donations, family.donations.length, 0);
				// no donations, send res back
			} else {
				con.end();
				res.status(200).json(family);
			}
		}else {
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
		child.birthdate = formatDates(child.birthdate);
		con.query(updateFam.kids, [child.firstName, child.lastName,
			child.school, child.birthdate, child.notes,
			child.email, child.cell, child.id], function (err, res) {
			if(err) {
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
		child.birthdate = formatDates(child.birthdate);
		console.log("in insertChild", family, child, "len ", length, " index ", index, " of undef: ", family.children);
		con.query(insertFam.kids, [child], function (err, res) {
			if(err) {
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
			res.status(200).json(family);
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
		donation.date = formatDates(donation.date);
		console.log("donations", donation, donations, length, index);
		con.query(insertFam.donations, [donation], function (err, res) {
			if(err) {
				throw err;
			}
			// get back donation id, so doesn't re-insert when creating family
			family.donations[index].id = res.insertId;
			family.donations[index].date = donation.date;
			cb(donations, length, ++index);
		});
	};

});

module.exports = router;