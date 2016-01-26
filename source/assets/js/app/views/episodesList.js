Buglr.EpisodesView = Marionette.CompositeView.extend({
	
	childViewContainer: "ul",
	template: '#list-layout',
	childView: Buglr.EpisodeView
});