Buglr.Controller = {
	
	home : function() {

		// Main View Boot goes here
		var view,
			title;

		view = new Buglr.HomeView();

		Buglr.applicationState.set('title', 'The Buglr Home');

		Buglr.mainView.mainRegion.show(view);
	},

	podcastPlay: function() {
		var view,
			title;

		Buglr.mainView.mainRegion.reset();
		Buglr.applicationState.set('title', 'Buglr Podcast');

		view = new Buglr.EpisodesView({
			collection : Buglr.episodes
		});

		Buglr.mainView.mainRegion.show(view);
	}
};