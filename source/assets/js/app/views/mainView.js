Buglr.MainView = Marionette.LayoutView.extend({
	
	template : '#home-view',

	regions: {
		latestPod : '#latestPod',
		titleView : '#titleView',
		mainRegion: '#mainRegion'
	},

	onDomRefresh: function() {

		var title = new Buglr.TitleView({
			model : Buglr.applicationState
		});

		this.titleView.show(title);
	}
})