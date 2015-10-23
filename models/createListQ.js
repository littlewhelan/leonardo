module.exports = {

//this should get all corp donors
	donorList: 'SELECT "company" AS type, city AS city, id AS id contactFirstName AS firstName, contactLastName AS lastName, contactEmail AS email FROM corpDonors',

//this should get all the families for the mailing list
	familyList: 'SELECT "adult" AS type, adultOneCity AS city, id AS id adultOneFirstName AS firstName, adultOneLastName AS lastName, adultOneEmail AS email FROM families UNION SELECT "adult" AS type, adultTwoCity as city, id AS id, adultTwoFirstName AS firstName, adultTwoLastName AS lastName, adultTwoEmail email FROM families',

//this should get all emails of all people and corp with the same zip code
	zipList: 'SELECT "adult" AS type, id AS id,  adultOneCity AS city, adultOneFirstName AS firstName, adultOneLastName AS lastName, adultOneEmail AS email FROM families WHERE adultOneZip = ? UNION SELECT "adult" AS type, id AS id,  adultTwoCity AS city, adultTwoFirstName AS firstName, adultTwoLastName AS lastName, adultTwoEmail AS email FROM families WHERE adultTwoZip = ? UNION SELECT "company" AS type, id AS id, city AS city, contactFirstName AS firstName, contactLastName AS lastName, contactEmail AS email FROM corpDonors WHERE Zip = ? ',

//this should get all emails of families with kids that are a certain age
	ageList: 'SELECT "adult" AS type, id AS id, adultOneCity as city, adultOneEmail AS email FROM families AS f WHERE f.id IN ' +
	'(SELECT familyID FROM children WHERE DATEDIFF(CURDATE(), birthdate) / 365.24 BETWEEN ? AND ?) ' +
	'GROUP BY f.id'

};