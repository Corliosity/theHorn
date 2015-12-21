var express = require('express');
var router 	= express.Router();

router.route('/admin')
	.get(function(req, res) {
		res.json({name : "Andrew Corliss"});
	});

module.exports = router;