Buglr.MainView = Marionette.LayoutView.extend({
	
	template : '#home-view',

	regions: {
		latestPod : '#latestPod',
		titleView : '#titleView',
		mainRegion: '#mainRegion'
	},

	onDomRefresh: function() {

		var title = new Buglr.TitleView({
			model : Buglr.applicationState,
			className : 'title-row padding-20'
		});

		this.titleView.show(title);

		var lastEpisode = new Buglr.EpisodePlayer({
			model: Buglr.episodes.last()
		});

		this.latestPod.show(lastEpisode);
	}
})