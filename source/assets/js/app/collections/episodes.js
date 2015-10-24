Buglr.EpisodeCollection = Backbone.Collection.extend({
	
	model : Buglr.EpisodeModel,

	initialize: function(models, options) {
		models = [
			{
				id: 1,
				title : "The Bullshit Begins",
				description: "This is how it begins. Frustrated Bugle listeners upset at the lack of new Bugle's decide to make their own. This is the result.",
				released: "08/28/2015",
				duration: "20:35",
				source : "source/assets/media/Episode-1.mp3"
			},
			{
				id: 2,
				title: "The Drug Episode",
				description: "All about the drugs",
				released: "09/12/2015",
				duration: "",
				source: "source/assets/media/Episode-2.mp3"
			},
			{
				id: 3,
				title: "Sausage Fest",
				description: "Just all about the sausages...unfortunately not the kind you eat.",
				released: "10/12/2015",
				duration: "",
				source: "source/assets/media/Episode-3.mp3"
			}
		];

		this.reset(models, {silent: true});
	}
});