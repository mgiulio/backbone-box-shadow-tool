$(function() {

window.BoxShadow = Backbone.Model.extend({
	defaults: function() {
		return {
			horizOffset: 0, 
			vertOffset: 0,
			blurRadius: 0,
			spreadDistance: 0,
			color: 'rgba(0,0,0,1)'
		};
	}
});

boxShadow = new BoxShadow();

boxShadowWriter = {
	set: function(horizOffset, vertOffset, blurRadius, spreadDistance, color) {
		this.horizOffset = horizOffset;
		this.vertOffset = vertOffset;
		this.blurRadius = blurRadius;
		this.spreadDistance = spreadDistance;
		this.color = color;
	},
	toString: function() {
	}
};

window.SampleView = Backbone.View.extend({
	el: $('#sample-box'),
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		$(this.el).css(this.model.toJSON());
		return this;
	}
});

window.OutputView = Backbone.View.extend({
	el: $('#css-ouput > textarea'),
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		boxShadowWriter.set(this.model.toJSON());
		$(this.el).html(boxShadowWriter);
		return this;
	}
});

window.ControlView = Backbone.View.extend({
	el: $('#sample-box'),
	initialize: function() {
		this.model.bind('change', this.render, this);
	},
	render: function() {
		$(this.el).css(this.model.toJSON());
		return this;
	}
});

window.AppView = Backbone.View.extend({
	el: $('.widget.box-shadow'),
	initialize: function() {
		this.sampleView = new SampleView({model: boxShadow});
		this.outputView = new OutputView({model: boxShadow});
		this.controlView = new ControlView({model: boxShadow});
	 }
});

window.App = new AppView;

});
