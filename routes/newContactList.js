var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/', function (req, res, next) {

    console.log('/newContactList');
    if (req.body.name) {
        options.json.name = req.body.name;
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
    } else {
        res.sendStatus(400);
    }
});


var options = {
    url: 'https://api.constantcontact.com/v2/lists?api_key=yg5p2qf549qacmbqayk5rn23',
    'auth': {
        'bearer': 'ef5d5df2-a808-4c70-a5d9-eb71163cbeb9'
    },
    //headers: {
    //    'Content-Type': 'application/json'
    //},
    json: {name: "", status: "ACTIVE"}
};

module.exports = router;