var express = require('express');
var router 	= express.Router();

router.route('/admin')
	.get(function(req, res) {
		res.json('Here is an admin');
	});

module.exports = router;