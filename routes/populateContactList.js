var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function (req, res, next) {

    console.log('/populateContactList');

        options.json.import_data = req.body.importDataArray;
        options.json.lists = [req.body.listNum];

    console.log("json: " + options.json);

        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Body:", body);
                res.json(body);
            } else if (!error && response.statusCode == 201) {
                console.log("Body:", body);
                res.json(body);
            }
            else {
                console.log("Status:", response.statusCode, "Error:", error);
                res.sendStatus(response.statusCode);
            }
        });

});


var options = {
    url: 'https://api.constantcontact.com/v2/activities/addcontacts?api_key=u8w59ztxe3294adczfvn7k9e',
    'auth': {
        'bearer': 'ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'
    },
    json:
    {
        import_data: [],
        lists: [],
        column_names: [
            "EMAIL",
            "FIRST NAME",
            "LAST NAME",
            "CITY",
            "COMPANY NAME"
        ]
    }
};

module.exports = router;