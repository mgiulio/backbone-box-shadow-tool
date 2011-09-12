$(function() {

window.BoxShadow = Backbone.Model.extend({
	defaults: function() {
		return {
			horizOffset: 0, 
			vertOffset: 0,
			blurRadius: 0,
			spreadDistance: 0,
			color: new Color('rgba(0,0,0,0.5)')
		};
	},
	getCSSText: function() {
		return this.mozilla() +
			this.opera() +
			this.std()
		;
	},
	mozilla: function() {
		return '';
	},
	opera: function() {
		return '';
	},
	std: function() {
		return 'box-shadow: ' + 
			this.attributes.horizOffset + 'px ' +
			this.attributes.vertOffset + 'px ' +
			this.attributes.blurRadius + 'px ' +
			this.attributes.spreadDistance + 'px ' +
			this.attributes.color
		;
	}
});

boxShadow = new BoxShadow();

window.SampleView = Backbone.View.extend({
	el: $('#sample-box').get(0),
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		this.el.style.cssText = this.model.getCSSText();
		return this;
	}
});

window.OutputView = Backbone.View.extend({
	el: $('#css-output > textarea'),
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		this.el.html(this.model.getCSSText());
		return this;
	}
});

window.ControlView = Backbone.View.extend({
	el: $('#controls'),
	events: {
		/*
			atach handlers to domand custom (from widgets) events
			read desidered changes
			compute the finalmodelchange
			change the model
		*/
	},
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		//$(this.el).css(this.model.toJSON());
		return this;
	}
});

window.AppView = Backbone.View.extend({
	el: $('.widget.box-shadow'),
	initialize: function() {
		this.sampleView = new SampleView({model: boxShadow});
		this.outputView = new OutputView({model: boxShadow});
		this.controlView = new ControlView({model: boxShadow});
		
		boxShadow.set({blurRadius: 10});
	 }
});

window.App = new AppView;

});
