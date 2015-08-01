var express,
	app,
	server;

express = require('express');
app 	= express();

/* App Routing - To be moved 
 *
 * param1 {object} - REQUEST method
 * param2 {object} - RESPONSE method
 * return {object} - can return and OJBECT or Page Reference
 */
 
app.get('/', function(request, response) {

	response.send("Hello World I am The Horn");
});

server = app.listen(8080, function() {
	var host,
		port;

	host = server.address().address;
	port = server.address().port;

	console.log('The Horn is listening at http://%s:%s', host, port);
});