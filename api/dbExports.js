var pg = require('pg');
// Both JSON and RSS will wind up making a similar call to DB  put into one function
// That will handle retrieving data from DB

/**
 * DB is the class for all DataBase operations.  I am hopefull this can make it easier to change out which type of Database is being worked with
 * We define all methods in the Scope of the class.
 * _client Private Variable, initialized as empty object, will hold object reference to DB Library
 * results array of rows/data from table
 * methods ()
 *
 * return {object} - DB
 */
function DB() {
	this._client 		= {};
	this.results 		= [];
	this.connectToDB 	= connectToDB;
	this.getResults 	= getResults;
	this.createRow 		= createRow;
	this.updateRow 		= updateRow;
	this.deleteRow		= deleteRow;
}

/**
 * Creates initial client connection to DB from URL string
 * @param {required} String - e.g. process.env.DATABASE_URL || postgres://localhost:3454/data
 * @return {object} Client object
 */
function connectToDB(connectionString) {

	this._client = new pg.Client(connectionString);
	this._client.connect();

	return this._client;
}

/**
 * Get all results from a table in the data base
 * @param {required} String - e.g. process.env.DATABASE_URL || postgres://localhost:3454/data
 * @param {required} Callback Function - since Node is asynchronous must supply callbacks to tell when service is done
 * @return {array} Results
 */
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
