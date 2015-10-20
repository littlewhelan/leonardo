
 module.exports = {
// this query gets all the adult 1 info
  searchA1:'SELECT "adult" AS type, adultOneFirstName AS AFN, adultOneLastName AS ALN, mainPhone AS MP, adultOneCell AS AC, adultOneEmail AS AE FROM families WHERE adultOneFirstName REGEXP ? OR adultOneLastName REGEXP ?',

//this query will get all the adult 2 info
 searchA2: 'SELECT "adult" AS type, adultTwoFirstName AS AFN, adultTwoLastName AS ALN, mainPhone AS MP, adultTwoCell AS AC, adultTwoEmail AS AE FROM families WHERE adultTwoFirstName REGEXP ? OR  adultTwoLastName REGEXP ?',

//this query will get the info for the companies
 searchComp: 'SELECT "company" AS type, contactFirstName AS CFN, contactLastName AS CLN, name AS COMP, contactPhone AS CP, contactEmail AS CE FROM corpDonors WHERE name REGEXP ? OR contactFirstName REGEXP ? OR contactLastName REGEXP ?',

//this query will get the info for the children
 searchChild:'SELECT "child" AS type, adultOneFirstName AS CAFN, adultOneLastName AS CALN, mainPhone AS CMP, firstName AS FN, lastName AS LN FROM families f, children c WHERE f.id = c.familyID AND (lastName REGEXP ? OR firstName REGEXP ?)',
}