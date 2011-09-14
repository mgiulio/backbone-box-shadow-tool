$(function() {

window.BoxShadow = Backbone.Model.extend({
	defaults: function() {
		return {
			horizontalOffset: 0, 
			verticalOffset: 0,
			blurRadius: 0,
			spreadDistance: 0,
			color: 'rgba(0,0,0,0.5)'
		};
	},
	getCSSText: function() {
		var v = this.attributes.horizontalOffset + 'px ' +
			this.attributes.verticalOffset + 'px ' +
			this.attributes.blurRadius + 'px ' +
			this.attributes.spreadDistance + 'px ' +
			this.attributes.color + ';\n';
		return '-moz-box-shadow: ' + v + '-webkit-box-shadow: ' + v + 'box-shadow: ' + v;
	}
});

window.SampleView = Backbone.View.extend({
	el: $('#sample-box').get(0),
	initialize: function() {
		this.render();
		this.model.bind('change', this.render, this);
	},
	render: function() {
		this.el.style.cssText = this.model.getCSSText();
		return this;
	}
});

window.OutputView = Backbone.View.extend({
	el: $('#css-output'),
	initialize: function() {
		this.render();
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
		'change #blur-radius': 'setBlurRadius',
		'change #spread-distance': 'setSpreadDistance',
		'change #color': 'setColor'
	},
	initialize: function() {
		this.render();
		this.model.bind('change', this.render, this);
	},
	setHorizontalOffset: function() {
		this.model.set({horizontalOffset: this.$('#horizontal-offset').val()});
	},
	setVerticalOffset: function() {
		this.model.set({verticalOffset: this.$('#vertical-offset').val()});
	},
	setBlurRadius: function() {
		this.model.set({blurRadius: this.$('#blur-radius').val()});
	},
	setSpreadDistance: function() {
		this.model.set({spreadDistance: this.$('#spread-distance').val()});
	},
	setColor: function() {
		this.model.set({color: this.$('#color').val()});
	},
	render: function() {
		this.$('#horizontal-offset').val(this.model.get('horizontalOffset'));
		this.$('#vertical-offset').val(this.model.get('verticalOffset'));
		this.$('#vertical-offset').val(this.model.get('verticalOffset'));
		this.$('#blur-radius').val(this.model.get('blurRadius'));
		this.$('#spread-distance').val(this.model.get('spreadDistance'));
		this.$('#color').val(this.model.get('color'));
		
		return this;
	}
});

window.AppView = Backbone.View.extend({
	el: $('.widget.box-shadow'),
	initialize: function() {
		var boxShadow = new BoxShadow({
			horizontalOffset: 5,
			verticalOffset: 5,
			blurRadius: 5,
			spreadDistance: 3
		});
		
		this.sampleView = new SampleView({model: boxShadow});
		this.outputView = new OutputView({model: boxShadow});
		this.controlView = new ControlView({model: boxShadow});
	 }
});

window.App = new AppView;

});
