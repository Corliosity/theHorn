var pg = require('pg');
// Both JSON and RSS will wind up making a similar call to DB  put into one function
// That will handle retrieving data from DB

function DB() {
	this._client 		= {};
	this.results 		= [];
	this.connectToDB 	= connectToDB;
	this.getResults 	= getResults;
	this.createRow 		= createRow;
	this.updateRow 		= updateRow;
	this.deleteRow		= deleteRow;
}

function connectToDB(connectionString) {
	
	this._client = new pg.Client(connectionString);
	this._client.connect();

	return this._client;
}

function getResults(connectionString, callback) {
	var self = this;
	var dbConnection = this.connectToDB(connectionString);
	var query = dbConnection.query('SELECT * FROM episodes ORDER BY id DESC');

	query.on('row', function(row) {
		self.results.push(row);
	});

	query.on('end', function() {
		dbConnection.end();
		return callback(self.results);
	});
}

function createRow(data, callback) {

}

function updateRow(data, callback) {

}

function deleteRow(callback) {

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