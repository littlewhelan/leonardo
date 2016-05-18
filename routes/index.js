var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send('This is the index route');
	// res.sendFile('./public/static/index.html');
});

module.exports = router;