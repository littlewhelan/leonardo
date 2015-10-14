var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/:id', function(req, res){
    User.findOne({ resetPasswordToken: req.params.token}, function(err, user){
        if (!user){
            req.message('error', 'password reset token is invalid.');
            return res.redirect('/');
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;

        user.save(function(err){
            req.logIn(user, function(err){
                done(err, user);
            });
        });
    });
});

module.exports = router;
