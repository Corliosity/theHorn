$(document).ready(function() {
	
	$.ajaxSetup({
		cache: 'false',
		setHeaders: {
			'Application-Name' : 'Buglr'
		}
	});

	Buglr.applicationState = new Buglr.ApplicaitonState();
	Buglr.mainView = new Buglr.MainView();
	Buglr.episodes = new Buglr.EpisodeCollection();
	
	
	
	// We are initializing the applicaiton from hardcode data
	// When services are up move logic back into the done functions
	Buglr.episodes.fetch()
		.done(function() {
			Buglr.appRegion.show(Buglr.mainView);
			
		})
		.fail(function() {
			// show error messaging
		});
	
	Buglr.router = new Buglr.Router();
	Backbone.history.start();
	Buglr.start();
});