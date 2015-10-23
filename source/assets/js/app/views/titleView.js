Buglr.TitleView = Marionette.ItemView.extend({

	template : '#title-view',

	_modelBinder : undefined,

	bindings : {
		title : '#title'
	},

	initialize : function() {

		this._modelBinder = new Backbone.ModelBinder();
		this.listenTo(this.model, 'on:change', this.render);
	},

	onDomRefresh: function() {
		
		this._modelBinder.bind(this.model, this.el, this.bindings);
	}
});