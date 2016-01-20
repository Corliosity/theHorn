Buglr.EpisodeModel = Backbone.Model.extend({

	initialize: function() {
		
		if (configuration.env === 'production') {
			this.set({ 'episodeuri' : '/source/' + this.get('episodeuri') }, { silent : true });
		}
	}
});