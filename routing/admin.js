// TODO : Will need to create an API for these routes
// 		: Preparation for an eventual mobile experience or to decouple the server from Front-End
//		: This is where PassPort will come into play to handle the JSON Token requests and cache them

var express = require('express');
var router = express.Router();

router.use(function timelog(req, res, next) {

	console.log('Time: ', Date.now());
	// Note next is just telling the app to continue with the next possible function
	next();
});

router.get('/admin', function(req, res) {

	res.send("Oh you want to log in to create podcasts...well hold on a minute");
});


module.exports = router;