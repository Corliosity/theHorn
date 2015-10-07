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

	
	Buglr.episodes.fetch()
		.done(function() {

			Buglr.appRegion.show(Buglr.mainView);
			Buglr.router = new Buglr.Router();
			Backbone.history.start();
		})
		.fail(function() {
			// show error messaging
		})

	Buglr.start();
});