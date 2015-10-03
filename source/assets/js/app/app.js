$(document).ready(function() {
	
	$.ajaxSetup({
		cache: 'false',
		setHeaders: {
			'Application-Name' : 'Buglr'
		}
	});

	Buglr.applicaitonState = new Buglr.ApplicaitonState()
	Buglr.mainView = new Buglr.MainView();

	Buglr.appRegion.show(Buglr.mainView);
	
	Buglr.router = new Buglr.Router();
	Backbone.history.start();


	Buglr.start();
});