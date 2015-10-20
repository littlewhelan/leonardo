module.exports = {

    //select all family info based on family id -- this can be limited to 1 company
    familyTab:'SELECT * from families WHERE id = ? LIMIT 1',

    //select all info on children based on familyid -- this can not be limited to one as there may be more than 1 child per family
    childTab:'SELECT * from children WHERE familyID = ?',

    //select all info on companies based on id -- this can be limited to 1 company
    compTab: 'SELECT * from corpDonors WHERE id = ? LIMIT 1'
}