module.exports = {
	mainFam: 'UPDATE families SET adultOneFirstName = ?, adultOneLastName = ?, ' +
	'adultOneCell = ?, adultOneWork = ?, adultOneMain = ?, adultOneEmail = ?, adultOneCompany = ?, ' +
	'adultOneAddressOne = ?, adultOneAddressTwo = ?, adultOneCity = ?, adultOneState = ?,' +
	'adultOneZip = ?, adultOneNotes = ?, adultTwoFirstName = ?, adultTwoLastName = ?, ' +
	'adultTwoCell = ?, adultTwoWork = ?, adultTwoMain = ?, adultTwoEmail = ?, adultTwoCompany = ?,' +
	'adultTwoAddressOne = ?, adultTwoAddressTwo = ?, adultTwoCity = ?, adultTwoState = ?,' +
	'adultTwoZip = ?, adultTwoNotes = ?, emerFirstName = ?, emerLastName = ?, emerPhone = ?,' +
	'emerAddressOne = ?, emerAddressTwo = ?, emerCity = ?, emerState = ?, emerZip = ?, emerNotes = ? ' +
	'WHERE id = ? ' +
	'LIMIT 1',
	kids: 'UPDATE children SET firstName = ?, lastName = ?, school = ?, birthdate = ?, notes = ?,' +
	'email = ?, cell = ? ' +
	'WHERE id = ? ' +
	'LIMIT 1'
};