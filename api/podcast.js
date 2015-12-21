var express = require('express');
var pg = require('pg');
var path = require('path');

module.exports = (function() {
	var connectionString = require('./config');
	var api = express.Router();

	api.route('/json')
		.get(function(req, res) {

			var results = [];

			pg.connect(connectionString, function(err, client, done) {

				if (err) {
					done();
					return res.status(500).json({success: false, data: err});
				}

				var query = client.query('SELECT * FROM episodes ORDER BY id ASC');

				query.on('row', function(row) {
					results.push(row);
				});

				query.on('end', function() {

					done();

					if (results.length === 0) {
						return res.json({success: true, data: null});
					}

					return res.json(results);
				})
			});
		})

		.post(function(req, res) {

			var results = [];

			var url = '/_assets/media/' + req.body.epName;

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

	api.route('/rss')
		.get(function(req, res) {
			var results = [];

			pg.connect(connectionString, function(err, client, done) {

				if (err) {
					done();
					return res.status(500).json({success: false, data: err});
				}

				var query = client.query('SELECT * FROM episodes ORDER BY id ASC');

				query.on('row', function(row) {
					results.push(row);
				});

				query.on('end', function() {
					done();

					res.header('Content-Type','text/xml');

					return res.render('rss.jade',
						{
							episodes:results
						});
				});
		});
	});

	return api;

})();