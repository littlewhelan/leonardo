var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname,'../index.html'));
    res.send('This is the create Mail List Route');
});

router.get('/*', function(req, res, next) {
    res.render('index');
});


module.exports = router;
