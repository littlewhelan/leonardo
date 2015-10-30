module.exports = {

//this should get all corp donors
	corpList: 'SELECT name AS company, city AS city, id AS id, contactFirstName AS firstName, contactLastName AS lastName, contactEmail AS email FROM corpDonors WHERE contactEmail IS NOT NULL',

//this should get all the families for the mailing list
	famList: 'SELECT null AS company, adultOneCity AS city, id AS id, adultOneFirstName AS firstName, adultOneLastName AS lastName, adultOneEmail AS email FROM families WHERE adultOneFirstName IS NOT NULL AND adultOneEmail IS NOT NULL UNION SELECT null AS company, adultTwoCity as city, id AS id, adultTwoFirstName AS firstName, adultTwoLastName AS lastName, adultTwoEmail email FROM families WHERE adultTwoFirstName IS NOT NULL AND adultTwoEmail IS NOT NULL',

//this should get all emails of all people and corp with the same zip code
	zipList: 'SELECT null AS company,  id AS id,  adultOneCity AS city, adultOneFirstName AS firstName, adultOneLastName AS lastName, adultOneEmail AS email FROM families WHERE adultOneZip = ? AND adultOneEmail IS NOT NULL UNION SELECT null AS company, id AS id,  adultTwoCity AS city, adultTwoFirstName AS firstName, adultTwoLastName AS lastName, adultTwoEmail AS email FROM families WHERE adultTwoZip = ? AND adultTwoEmail IS NOT NULL UNION SELECT name AS company, id AS id, city AS city, contactFirstName AS firstName, contactLastName AS lastName, contactEmail AS email FROM corpDonors WHERE Zip = ? AND contactEmail IS NOT NULL',

//this should get all emails of families with kids that are a certain age
	ageList: 'SELECT null AS company,  adultOneCity as city, id AS id, adultOneFirstName as firstName,adultOneLastName AS lastName, adultOneEmail AS email FROM families AS f WHERE adultOneEmail IS NOT NULL AND  f.id IN ' +
	'(SELECT familyID FROM children WHERE DATEDIFF(CURDATE(), birthdate) / 365.24 BETWEEN ? AND ?) GROUP BY f.id ',

	ageList2: 'SELECT null as company, f.adultOneCity as city, f.id AS id, c.firstName AS firstName, c.lastName AS lastName, c.email AS email FROM families AS f, children AS c WHERE c.email IS NOT NULL f.id IN (SELECT familyID FROM children WHERE DATEDIFF(CURDATE(), birthdate) / 365.24 BETWEEN ? AND ?)'
};