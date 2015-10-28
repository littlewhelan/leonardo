module.exports = {

    //select all family info based on family id -- this can be limited to 1 company
    familyTab:'SELECT * FROM families WHERE id = ? LIMIT 1',

    //select all info on children based on familyId -- this can not be limited to one as there may be more than 1 child per family
    childTab:'SELECT * FROM children WHERE familyID = ?',

    //select all info on families based on id
    donateTab: 'SELECT * FROM individualDonations WHERE id = ?',

    //select all info on a corporation based on id
    companyTab: 'SELECT * FROM corpDonors WHERE id = ? LIMIT 1',

    //select all info on past donations of companies
    companyDonationsTab:'SELECT * FROM corpDonations WHERE donorID = ?'


}