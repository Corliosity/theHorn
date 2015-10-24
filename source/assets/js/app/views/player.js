Buglr.EpisodePlayer = Marionette.ItemView.extend({
	
	template: '#player-view',

	initialize: function(option) {
		var episode;

		console.log(this.model);

		if (option.data instanceof Buglr.EpisodeModel) {
			// do something here
		}
	}
	
});