module.exports = {

 //this should get all corp donors
 donorList: 'SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, contactEmail AS CE FROM corpDonors',

 //this should get all the families for the mailing list
 familyList: 'SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, adultOneEmail AS AE FROM families UNION SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, adultTwoEmail AE FROM families',

 //this should get all emails of all people and corp with the same zip code
 zipList: 'SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, adultOneEmail AS AE FROM families WHERE adultOneZip = ? UNION SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, adultTwoEmail AS AE FROM families WHERE adultTwoZip = ? UNION SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, contactEmail AS CE FROM corpDonors WHERE Zip = ? ',

 //this should get all emails of families with kids that are a certain age
 ageList: 'SELECT adultOneEmail FROM families AS f WHERE f.id IN ' +
 '(SELECT familyID FROM children WHERE DATEDIFF(CURDATE(), birthdate) / 365.24 BETWEEN ? AND ?) ' +
 'GROUP BY f.id'

 };