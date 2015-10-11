Buglr.EpisodeCollection = Backbone.Collection.extend({
	
	model : Buglr.EpisodeModel,

	url : Buglr.appConfig.startUrl
});