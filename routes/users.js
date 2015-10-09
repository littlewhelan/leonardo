var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the users route');
});

router.get('/*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
