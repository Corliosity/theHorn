Buglr.EpisodesView = Marionette.CollectionView.extend({
	
	tagName: 'ul',

	className: 'podcast-episode-list',

	childView: Buglr.EpisodeView,

	intialize: function() {

	}

});