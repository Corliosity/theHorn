var Buglr = new Backbone.Marionette.Application();

Buglr.addRegions({
	appRegion : '#appRegion'
});

Buglr.appConfig = {
	startUrl : window.configuration.startUrl,
	localKey : window.configuration.localKey
};