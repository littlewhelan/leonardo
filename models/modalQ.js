module.exports = {

    //select all family info based on family id -- this can be limited to 1 company
    familyTab:'SELECT * FROM families WHERE id = ?',

    //select all info on children based on familyId -- this can not be limited to one as there may be more than 1 child per family
    childTab:'SELECT * FROM children WHERE familyID = ?',

    //select all info on companies based on id -- this can be limited to 1 company
    donateTab: 'SELECT * FROM individualDonations WHERE id = ? ',

    //select all info on a copration based on id
    companyTab: 'SELECT * FROM corporateDonors WHERE id =?',

    //select all info on past donations
    companyDonationsTab:'SELECT * FROM corporateDonations WHERE id = ? '


}