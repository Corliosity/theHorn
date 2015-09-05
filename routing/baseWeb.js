var express = require('express');
var router 	= express.Router();

// Create a timelog of events that can be sent to a logger function
router.use(function timeLog(req, res, next) {
  
  next();
});

router.get('/', function(request, response) {
	response.render('index', { title : 'The Buglr' });	
});

router.get('/about', function(request, response){
	response.render('about', { title : 'About - The Buglr' });
});

module.exports = router;