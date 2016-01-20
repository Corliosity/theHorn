var connectionString = require('./config');
var pg = require('pg');
// Both JSON and RSS will wind up making a similar call to DB  put into one function
// That will handle retrieving data from DB

var DB = {
	connectToDB : function() {
		var client = new pg.Client(connectionString);

		client.connect();

		return client;
	},

	returnAllRows: function(callback) {
		var results = [];
		var dbConnection = this.connectToDB();

		var query = dbConnection.query('SELECT * FROM episodes ORDER BY id ASC');

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			dbConnection.end();
			callback(results);
		});
	},

	postToDataBase: function() {

	},

	updateRowInDataBase: function() {

	}
}

module.exports = DB;

/*
exports.connectToDB = function() {
	var client = new pg.Client(connectionString);

	client.connect();

	return client;
};

exports.getAllDB = function() {

	var results = [];
	var dbConnection = connectToDB();

	var query = dbConnection.query('SELECT * FROM episodes ORDER BY id ASC');

	query.on('row', function(row) {
		results.push(row);
	});

	query.on('end', function() {
		dbConnection.end();

		return results;
	});
};

exports.postToDB = function() {

};

exports.updateToDB = function() {

};
*/