var express = require('express');
var router = express.Router();
var User = require('../models/user');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  	// res.send('This is the index route');
	// res.sendFile('./public/static/index.html');
	res.sendFile(path.join(__dirname, '../public/static/index.html'));
});

module.exports = router;