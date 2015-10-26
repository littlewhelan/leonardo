exports.validate = function (type, obj) {
	// check properties, make sure all are valid properties (white list)
	if(!validateProperties(type, obj)) {
		// if fails sub-object check, fail the test
		return false;
	}else {
		// loop through calling validateProperties on the properties of sub-objects
		var subPropsArray = Object.keys(obj);
		subPropsArray.forEach(function (v, i, a) {
			var prop = v;
			// needs to intercept donations for fam/corp and change property name
			if(v == "donations") {
				if(type == "family") {
					prop = "famDonations";
				}else if(type == "corp") {
					prop = "corpDonations";
				}else {
					return false;
				}
			}
			// run check on properties of sub objects, fail whole object if one is false
			if(!validateProperties(prop, obj[v])) {
				return false;
			}
		});

		// if passes previous checks, then start validating information in properties

	}
};

// properties to iterate and make sure extra properties aren't added
var properties = {
	family: ["id", "adultOne", "adultTwo", "emergency", "children", "donations"],
	adultOne: ["firstName", "lastName", "addressOne", "addressTwo", "zip", "city", "state", "company", "work", "cell", "email", "main", "notes"],
	adultTwo: ["firstName", "lastName", "addressTwo", "addressTwo", "zip", "city", "state", "company", "work", "cell", "email", "main", "notes"],
	emergency: ["firstName", "lastName", "addressOne", "addressTwo", "zip", "city", "state", "phone", "notes"],
	children: ["id", "familyID", "firstName", "lastName", "school", "birthdate", "notes", "email", "cell"],
	famDonations: ["id", "familyID", "date", "amount", "notes"],
	corp: ["info", "contact", "donations"],
	info: ["name", "addressOne", "addressTwo", "zip", "city", "state", "phone", "notes", "email"],
	contact: ["firstName", "lastName", "email", "phone", "ext"],
	corpDonations: ["id", "donorID", "date", "amount", "notes"]
};

// maps objects and properties and sub-object properties to their data type
var mappings = {
	family: {
		id: "int",
		adultOne: {
			firstName: "name",
			lastName: "name",
			addressOne: "address",
			addressTwo: "address",
			zip: "zip",
			city: "city",
			state: "state",
			company: "compName",
			work: "phone",
			cell: "phone",
			email: "email",
			main: "phone",
			notes: "notes"
		},
		adultTwo: {
			firstName: "name",
			lastName: "name",
			addressOne: "address",
			addressTwo: "address",
			zip: "zip",
			city: "city",
			state: "state",
			company: "compName",
			work: "phone",
			cell: "phone",
			email: "email",
			main: "phone",
			notes: "notes"
		},
		emergency: {
			firstName: "name",
			lastName: "name",
			addressOne: "address",
			addressTwo: "address",
			zip: "zip",
			city: "city",
			state: "state",
			phone: "phone",
			notes: "notes"
		},
		children: {
			id: "int",
			familyID: "int",
			firstName: "name",
			lastName: "name",
			school: "corpName",
			birthdate: "date",
			notes: "notes",
			email: "email",
			cell: "phone"
		},
		donations: {
			id: "int",
			familyID: "int",
			date: "date",
			amount: "amount",
			notes: "notes"
		}
	},
	corp: {
		id: "int",
		info: {
			name: "name",
			addressOne: "address",
			addressTwo: "address",
			zip: "zip",
			city: "city",
			state: "state",
			phone: "phone",
			notes: "notes",
			email: "email"
		},
		contact: {
			firstName: "name",
			lastName: "name",
			phone: "phone",
			email: "email",
			ext: "ext",
			notes: "notes"
		},
		donations: {
			id: "int",
			donorID: "int",
			date: "date",
			amount: "amount",
			notes: "notes"
		}
	}
};

var validateProperties = function (type, obj) {
	var propsArray = Object.keys(obj);
	// default passes, unless finds error
	var pass = true;
	// loop through property in passed obj
	propsArray.forEach(function (v, i, a) {
		// if property in passed obj is not in whitelist, then kick back error
		if($.inArray(v, properties[type]) == -1) {
			pass = false;
		}
	});
	return pass;
};

// iterate through object and check it according to mappings
var validateObject = function (obj) {
	var validObject = true;
	// while loop, so as soon as an invalid input is received, break out and return false
	while(validObject) {
		// get array of properties
		var props = Object.keys(obj);
		// loop through properties of overall object
		props.forEach(function (v, i, a) {
			// if type is object, then need to iterate through it's properties
			if(typeof obj[v] == "object") {

			}else if(typeof obj[v] == "array") {
				// if it's an array, need to iterate through array, validate that info

			}else {
				// else just need to validate to it's type
				// if fails, then return false
				if(!validateString(mappings[v], obj[v])) {
					return false;
				}
			}
		});
	}
	return validObject;
};

var validateString = function (type, value) {
	//console.log("validateInput()");
	// stores the form being called on
	var pattern;
	switch (type) {
		case "name":
		case "city":
		case "state":
			// allows and alpha chars, as well as white space and a few extra chars
			pattern = /^[a-zA-z\s,.'-]+$/;
			break;
		case "corpName":
			pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+-]+$/;
			break;
		case "address":
			pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&-]+$/;
			break;
		case "zip":
			pattern = /^[0-9]{5}$/;
			break;
		case "phone":
			pattern = /^([(][0-9]{3}[)]|[0-9]{3})[\s\-.]?[0-9]{3}[\s\-.]?[0-9]{4}$/;
			break;
		case "email":
			pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			break;
		case "notes":
			pattern = /^[a-zA-Z0-9\s,.?@!#'~*_;+:()%&<>\[\]{}\-="|`\\\/]+$/;
			break;
		case "ext":
			pattern = /^[a-zA-Z0-9\s:-]+$/;
			break;
		case "date":
			pattern = /^20[0-9]{2}[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
			break;
		case "birthdate":
			pattern = /^(199[0-9]|20[0-9]{2})[-](0[1-9]|1[0-2])[-](0[1-9]|[1-2][0-9]|3[01])$/;
			break;
		case "amount":
			pattern = /^[\$]?[\d]+([.][\d]{2})?$/;
			break;
		default:
			console.log("invalid class search");
			return false;
			break;
	}

	return pattern.test(value);
};