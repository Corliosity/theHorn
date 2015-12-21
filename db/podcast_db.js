var pg = require('pg');
var connections = process.env.DATABASE_URL || 'postgres://localhost:5432/podcasts';

var client = new pg.Client(connections);
client.connect();

var queryPodcast = client.query('CREATE TABLE episodes (
	id serial PRIMARY KEY,
	title varchar(100) NOT NULL,
	episodeURI varchar(255) NOT NULL,
	description varchar(500),
	updated date 
	)
');

queryPodcast.on('end', function() { client.end(); });