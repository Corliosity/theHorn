// TODO : Will need to create an API for these routes
// 		: Preparation for an eventual mobile experience or to decouple the server from Front-End
//		: This is where PassPort will come into play to handle the JSON Token requests and cache them

var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	// Setup all necessary header elements in here
	// Note next is just telling the app to continue with the next possible function
	next();
});

router.get('/', function(request, response) {
	response.send("Hello");
	//response.render("error");
});


module.exports = router;