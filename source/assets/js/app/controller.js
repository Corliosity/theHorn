Buglr.Controller = {
	
	home : function() {

		// Main View Boot goes here
		var view,
			title,
			epList;

		view = new Buglr.HomeView();
		epList = new Buglr.EpisodesView({
			collection: Buglr.episodes
		});

		Buglr.applicationState.set('title', 'The Buglr Home');

		Buglr.mainView.mainRegion.show(view);
		Buglr.mainView.episodeRegion.show(epList);
	},

	podcastPlay: function() {
		var view,
			title;

		Buglr.mainView.mainRegion.reset();
		Buglr.mainView.episodeRegion.reset();
		Buglr.applicationState.set('title', 'Buglr Podcast');

		view = new Buglr.EpisodesView({
			collection : Buglr.episodes
		});

		Buglr.mainView.mainRegion.show(view);
	}
};