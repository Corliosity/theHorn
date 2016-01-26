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
			/*
			db.returnAllRows(function(results) {
				res.json(results);
			});
			*/
			data.getResults(connectionString, function(response) {
				res.json(response);
			});

		})
		.post(function(req, res) {

			var results = [];

			var url = '/assets/media/' + req.body.epName;

			var data = {
				title : req.body.epTitle,
				descrip: req.body.epDescrip,
				updated: new Date(),
				uri : url
			};

			pg.connect(connectionString, function(err, client, done) {

				if (err) {
					done();
					return res.status(500).json({ success: false, data: err});
				}

				client.query('INSERT INTO episodes(title, episodeuri, description, updated) values($1,$2,$3,$4)',
					[data.title, data.uri, data.descrip, data.updated]);

				var query = client.query('SELECT * FROM episodes ORDER BY id');

				query.on('row', function(row) {
					results.push(row);
				});

				query.on('end', function(){
					done();

					return res.json(results);
				});

			});
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

			db.returnAllRows(function(results) {
				return res.render('rss.jade', {
					episodes: results,
					host: req.headers.hostname
				});
			});
	});

	return api;

})();