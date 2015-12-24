// TODO : Will need to create an API for these routes
// 		: Preparation for an eventual mobile experience or to decouple the server from Front-End
//		: This is where PassPort will come into play to handle the JSON Token requests and cache them

var express = require('express');

module.exports = (function() {

	var admin = express.Router();

	admin.route('/')
		.get(function(request, response) {
			response.send({name : 'Admin'});
		});

	return admin;

})();