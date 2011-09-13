$(function() {

window.BoxShadow = Backbone.Model.extend({
	defaults: function() {
		return {
			horizontalOffset: 0, 
			verticalOffset: 0,
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
			this.attributes.horizontalOffset + 'px ' +
			this.attributes.verticalOffset + 'px ' +
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
		'change #horizontal-offset': 'setHorizontalOffset',
		'change #vertical-offset': 'setVerticalOffset',
		'change #spread-distance': 'setSpreadDistance',
		'change #blur-radius': 'setBlurRadius'
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
	},
	setHorizontalOffset: function() {
		this.model.set({horizontalOffset: this.$('#horizontal-offset').val()});
	},
	setVerticalOffset: function() {
		this.model.set({verticalOffset: this.$('#vertical-offset').val()});
	},
	setSpreadDistance: function() {
		console.log('spreadDistanec');
		this.model.set({spreadDistance: this.$('#spread-distance').val()});
	},
	setBlurRadius: function() {
		this.model.set({blurRadius: this.$('#blur-radius').val()});
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
