var express = require('express');
var router = express.Router();

/*POST new contact list */
router.post('/', function(req, res, next) {
    //res.sendFile(path.join(__dirname,'../index.html'));
    res.send('This is the create Mail List Route');
});

/*POST*/
router.post('/*', function(req, res, next) {
    res.render('index');
});


module.exports = router;
