Buglr.EpisodeView = Marionette.ItemView.extend({

	template: '#podcast-view',

	tagName: 'li',

	className: 'row padding-10',

	events : {
		'click' : 'updatePlayer'
	},

	updatePlayer : function() {
		Buglr.mainView.latestPod.reset();

		var newShow = new Buglr.EpisodePlayer({
			model : this.model
		});

		Buglr.mainView.latestPod.show(newShow);
	}
})