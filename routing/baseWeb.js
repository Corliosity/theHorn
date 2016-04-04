var express = require('express');
var router 	= express.Router();

// Create a timelog of events that can be sent to a logger function
router.use(function(req, res, next) {
  
  next();
});

router.get('/', function(request, response) {
	console.log(request.headers.host);
	response.render('index', { title : 'The Buglr', configURL : '/api/v1/json/episodes', nodeEnv: 'production', host: request.headers.hostname });	
});

router.get('/contact', function(request, response) {
	response.render('contact', { title : 'Contact - The Buglr', configURL : '/assets/js/app/json/episode.json', nodeEnv: process.env.NODE_ENV });
});

module.exports = router;