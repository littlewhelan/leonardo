module.exports = {
	corp: 'UPDATE corpDonors SET name = ?, addressOne = ?, addressTwo = ? ' +
	'city = ?, state = ?, zip = ?, phone = ?, contactFirstName = ?, ' +
	'contactLastName = ?, contactPhone = ?, contactEmail = ?, contactExt = ? ' +
	'WHERE id = ? ' +
	'LIMIT 1'
};