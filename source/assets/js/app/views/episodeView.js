Buglr.EpisodeView = Marionette.ItemView.extend({

	template: '#podcast-view',

	ui : {
		elements : 'li'
	},

	events : {
		'click @ui.elements' : 'updatePlayer'
	},

	initialize: function() {

	},

	updatePlayer : function() {
		Buglr.mainView.latestPod.reset();

		var newShow = new Buglr.EpisodePlayer({
			model : this.model
		});

		Buglr.mainView.latestPod.show(newShow);
	}
})