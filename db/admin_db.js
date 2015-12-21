var pg = require('pg');
var connections = process.env.DATABASE_URL || 'postgres://localhost:8080/admin';
// Need to transform the above into Object Literal to expose methods and setup in routes.

module.exports = (function() {

	var client = new pg.Client(connections);
	client.connect();

	var queryAdmin = client.query();
	queryAdmin.on('end', function() { client.end(); });


})();