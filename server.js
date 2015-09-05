var express,
	app,
	http,
	server,
	router,
	admin,
	environment,
	appSettings,
	fs,
	path,
	logger,
	cookieParser,
	bodyParser,
	multipart,
	port;

// TODO : Import Bunyan - Modify Morgan for better logging and take out console.log from application

express 		= require('express'); // Framework to help setup quick NODE applications
http			= require('http'); 	  // Creates HTTP headers and functions
staticSite		= require('./routing/baseWeb'); // File contains router for our Base web site (Index, Podcast, About)
admin			= require('./routing/admin');   // File contains router for Admin application
environment 	= process.env;		  // Create a global variable to easily call envionrment functions
fs				= require('fs');      // Filereader module - using for podcast MP3
path			= require('path');    // Pathing helper funcitons
logger			= require('morgan');  // Logging to the console - > need to make sure this can save information to file on server
cookieParser	= require('cookie-parser'); // Cookie creation, parsing, and reading helper functions
bodyParser		= require('body-parser');   // Helps to get data from DOM elements in POST requests.
app 			= express();
appSettings		= app.settings;
multipart		= require('connect-multiparty'); // Helper functions for Audio/Video support
port 			= environment.PORT || 80;        // Initial Port setup to ensure NODE server will run properly in Produciton

/**
 * Application Setup
 *
 * Set rules for Main Directory, Templates, Parse and Logging
 *
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

// Setup application to log issues in development mode
// Call Body Parser helper funcitons to read in POST data (User Logins)
// Setup Cookies, and Audio helper functions
app.use(logger('combined'));
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


/**
 * 404 Error Handler
 * Creates an error object to be used and passed to pages.
 * TODO move this out of the server.js
 * TODO create generic 500/404 page
 * NOTE this must always be the last route called (i.e. if the server cannot find any other routes this will be called)
 */
app.use(function(err, req, res, next) {
  // logic - TODO: Create Error handling here
  if (res.headersSent) {
    return next(err);
  }
  res.status(404);
  res.render('error', { error: err });
});

server = app.listen(port, function() {

	var host,
		port;

	host = server.address().address;
	port = server.address().port;

});

// Export the Application Variable as a common JS module in case it needs to be used in other functiosn on the server
module.exports = app;