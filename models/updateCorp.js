module.exports = {
	corp: 'UPDATE corpDonors SET name = ?, addressOne = ?, addressTwo = ?, ' +
	'city = ?, state = ?, zip = ?, phone = ?, notes = ?, contactFirstName = ?, ' +
	'contactLastName = ?, contactPhone = ?, contactEmail = ?, contactExt = ?, contactNotes = ? ' +
	'WHERE id = ? ' +
	'LIMIT 1'
};