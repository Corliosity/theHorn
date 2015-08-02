var express = require('express');
var router 	= express.Router();

// Create a timelog of events that can be sent to a logger function
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(request, response) {
	response.render('index', { title : 'The Horn' });	
});

router.get('/about', function(request, response){
	response.send("Oh so you want to know about us");
});

module.exports = router;