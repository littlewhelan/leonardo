var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST /register/ */
router.post('/', function(req, res, next) {

    console.log("/register req.body:", req.body);
    User.Create(req.body, function(err, user){
        if(err){
            res.status(400).send(err.message);
        } else{
            res.send(200);
        }
    });
});

module.exports = router;