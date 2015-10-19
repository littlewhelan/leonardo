
var express = require('express');
var router = express.Router();
var request = require('request');

router.post('/newContactList',function(req,res,next){
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log(body);
            res.send(body);
        }
    });
});


var options = {
    url: 'https://api.constantcontact.com/v2/lists?api_key=yg5p2qf549qacmbqayk5rn23',
    headers: {
        'Authorization': 'Bearer ef5d5df2-a808-4c70-a5d9-eb71163cbeb9',
        'Content-Type': 'application/json'
    },
    body: {"name": "RequestTest", "status": "ACTIVE"}
};

module.exports = router;