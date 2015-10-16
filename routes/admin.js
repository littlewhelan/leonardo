var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* POST /register/ */
router.get('/admin', function(req,res,next){
    console.log(req.body);
    User.find({}, function(){
        if(err){
            res.status(400).send(err.message);
        } else {
            res.send(200);
            res.render('users', {users: user, user: req.user.username})
        }
    });
});

router.put('/', function(req, res, next) {

    console.log("/admin req.body:", req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
        if(err){
            res.status(400).send(err.message);
        } else{
            res.send(200);
        }
    });
});

module.exports = router;