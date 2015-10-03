var express = require('express');
var router 	= express.Router();

// Create a timelog of events that can be sent to a logger function
router.use(function(req, res, next) {
  
  next();
});

router.get('/:var(home)?', function(request, response) {
	response.render('index', { title : 'The Buglr' });	
});

router.get('/about', function(request, response){
	response.render('about', { title : 'About - The Buglr' });
});

router.get('/podcast', function(request, response) {
	response.render('podcast', { title : 'Podcast - The Buglr' });
});

module.exports = router;