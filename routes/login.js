var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST /api/register/ */
router.post('/', function (req, res, next) {

    User.getAuthenticated(req.body, function (err, token) {
        if (err) {
            console.log("routes",err.message);
            res.status(400).send(err.message);
        } else {
            res.send(token);
        }
    });
});



module.exports = router;

