var express = require('express');
var pg = require('pg');
var path = require('path');
var connectionString = require('./config');
var DB = require('./dbExports');
var data = new DB();

module.exports = (function() {
	
	var api = express.Router();
	
	api.use(function setBeforeRoute(req, res, next) {

		next();
	});

	api.route('/json/episodes')
		.get(function(req, res) {

			data.getResults(connectionString, function(response) {
				res.json(response);
			});

		})
		.post(function(req, res) {

		});
	api.route('/json/episodes/:id')
		.get(function(req, res) {

		})
		.put(function(req, res) {

		})
		.delete(function(req,res) {

		});

	api.route('/rss/episodes')
		.get(function(req, res) {
			

			res.header('Content-Type','text/xml');
			res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
			res.header('Expires', '-1');
			res.header('Pragma', 'no-cache');

			data.getResults(connectionString, function(response) {
				return res.render('rss.jade', {
					episodes	: response,
					host 		: req.headers.hostname
				});
			});
	});

	return api;

})();