var express,
	app,
	http,
	serverFinal,
	router,
	admin,
	adminAPI,
	environment,
	appSettings,
	fs,
	path,
	logger,
	cookieParser,
	bodyParser,
	multipart,
	appPort,
	logFolder,
	logStream;

// TODO : Import Bunyan - Modify Morgan for better logging and take out console.log from application

express 		= require('express'); // Framework to help setup quick NODE applications
http			= require('http'); 	  // Creates HTTP headers and functions
staticSite		= require('./routing/baseWeb'); // File contains router for our Base web site (Index, Podcast, About)
admin			= require('./routing/admin');   // File contains router for Admin application
adminAPI        = require('./routing/api/admin');
environment 	= process.env;		  // Create a global variable to easily call envionrment functions
fs				= require('fs');      // Filereader module - using for podcast MP3
path			= require('path');    // Pathing helper funcitons
logger			= require('morgan');  // Logging to the console - > need to make sure this can save information to file on server
cookieParser	= require('cookie-parser'); // Cookie creation, parsing, and reading helper functions
bodyParser		= require('body-parser');   // Helps to get data from DOM elements in POST requests.
app 			= express();
appSettings		= app.settings;
multipart		= require('connect-multiparty'); // Helper functions for Audio/Video support
appPort			= environment.PORT || 8080;
logFolder       = __dirname + '/server_log.log'; // Declare the location for all log files
/**
 * Application Setup
 *
 * Set rules for Main Directory, Templates, Parse and Logging
 * First Declare our view engine - Jade (May change to HTML for PROD)
 * Tell Applicaiton to not cache
 */
app.set('view engine', 'jade');
app.set('view cache', false);

// Use Source FOLDER for development MODE - Grunt will create a distribution  folder
// Setup where the static views (HTML, CSS, and JS) can be read from.
// Source is our development environment folder
// Dist is our 'distribution' environment folder
// TODO : Create Grunt tasks to automate front-end (not creating minimiaztion on server due to possible security issues)

if (appSettings.env !== "production") {

	app.set('views', __dirname + '/source');

} else {
	app.set('views', __dirname + '/dist');
}

// Setup application to log server requests and write to folder
// Call Body Parser helper funcitons to read in POST data (User Logins)
// Setup Cookies, and Audio helper functions

logStream = fs.createWriteStream(logFolder);

app.use(logger('combined', {stream : logStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(multipart({}));

/**
 * If we need to set global headers use the below method
 */
// app.use(function(res, req, next) { /* Header Logic goes here */ });

/**
 * Routing setup 
 * param1 {object} - What route to handle
 * param2 {object} - Module to use
 */

app.use('/', staticSite);
app.use('/admin', admin);
app.use('/api', adminAPI);

/**
 * 404 Error Handler
 * Creates an error object to be used and passed to pages.
 * TODO move this out of the server.js
 * TODO create generic 500/404 page
 * NOTE this must always be the last route called (i.e. if the server cannot find any other routes this will be called)
 */
 app.use(function(err, req, res, next){
  // error page
  res.status(500).render('error', {error : '500'});
});

app.use(function(req, res, next) {
  // logic - TODO: Create Error handling here
  res.status(404).render('error', { error: req.originalUrl });
});

function serverFinal() {

	var host,
		port,
		serverOnStart;

	host = app.server.address().address;
	port = app.server.address().port;

	// Write information to log files
	// Doing this can give us more information through nodemon without using the console
	serverOnStart = JSON.stringify({"Host" : host, "Port" : port});

	fs.writeFile('status_log.log', serverOnStart,function(err) {
		
		if (!err) {

		} else {
			throw err;
		}
	});
};

// Create HTTP server
// TODO : Get certificates to setup as HTTPS server - (if affordable)
app.server = http.createServer(app);
app.server.listen(appPort, serverFinal);

// Export the Application Variable as a common JS module in case it needs to be used in other functiosn on the server
module.exports = app;
