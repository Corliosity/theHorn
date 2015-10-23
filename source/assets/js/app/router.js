Buglr.Router = Marionette.AppRouter.extend({
	controller : Buglr.Controller,

	appRoutes : {
		'' : 'home',
		'podcast' : 'podcastPlay'
	}
});