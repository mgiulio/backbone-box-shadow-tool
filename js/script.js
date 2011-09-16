$(function() {

var
	BoxShadowModel = Backbone.Model.extend({
		defaults: function() {
			return {
				horizontalOffset: '0px', 
				verticalOffset: '0px',
				blurRadius: '0px',
				spreadDistance: '0px',
				color: 'rgba(0,0,0,0.5)'
			};
		},
		getCSSText: function() {
			var v = this.attributes.horizontalOffset + ' ' +
				this.attributes.verticalOffset + ' ' +
				this.attributes.blurRadius + ' ' +
				this.attributes.spreadDistance + ' ' +
				this.attributes.color + ';\n';
			return '-moz-box-shadow: ' + v + '-webkit-box-shadow: ' + v + 'box-shadow: ' + v;
		}
	}),
	SampleView = Backbone.View.extend({
		el: $('#sample-box').get(0),
		initialize: function() {
			this.render();
			this.model.bind('change', this.render, this);
		},
		render: function() {
			this.el.style.cssText = this.model.getCSSText();
			return this;
		}
	}),
	OutputView = Backbone.View.extend({
		el: $('#css-output'),
		initialize: function() {
			this.render();
			this.model.bind('change', this.render, this);
		},
		render: function() {
			this.el.html(this.model.getCSSText());
			return this;
		}
	}),
	ControlView = Backbone.View.extend({
		el: $('#controls'),
		events: { // The order is fundamental!
			'change #color': 'setColor',
			'change': 'onChange'
		},
		onChange: function(e) {
			var
				prop = {},
				div = e.target.parentNode,
				propName = div.id,
				input = $(div).find('input'),
				select = input.next()
			;
			prop[propName] = input.val() + select.val();
			this.model.set(prop);
		},
		setColor: function(e) {
			this.model.set({color: this.$('#color input').val()});
			e.stopImmediatePropagation();
		},
		initialize: function() {
			this.render();
			this.fillFieldsFromModel();
		},
		render: function() {
			this.el
				.append($('#length-property').tmpl([
					{name: 'horizontalOffset', label: 'hOff', title: 'horizontal offset'},
					{name: 'verticalOffset', label: 'vOff', title: 'vertical offset'},
					{name: 'blurRadius', label: 'blur', title: 'blur radius'},
					{name: 'spreadDistance', label: 'distance', title: 'spread distance'},
					{name: 'color', label: 'color', title: 'color'}
				]));
		},
		fillFieldsFromModel: function() {
			var
				parse = function(x) {
					var v = parseFloat(x);
					return [v, x.replace(v, '')];
				},
				m = {px:0, em:1, cm:2, mm:3, in:4},
				self = this
			;
			
			_.each(['horizontalOffset', 'verticalOffset', 'blurRadius', 'spreadDistance'], function(attr) {
				var a = parse(self.model.get(attr));
				self.$('#' + attr).find('input')
					.val(a[0])
					.next()
						.children()
							.find(':selected')
								.attr('selected', '')
								.end()
							.get(m[a[1]])
								.selected = 'selected'
				;
			});
			
			this.$('#color').find('input').val(this.model.get('color'));
		}
	}),
	AppView = Backbone.View.extend({
		el: $('#box-shadow'),
		initialize: function() {
			var boxShadow = new BoxShadowModel({
				horizontalOffset: '5px',
				verticalOffset: '5px',
				blurRadius: '5px',
				spreadDistance: '3px'
			});
			
			new SampleView({model: boxShadow});
			new OutputView({model: boxShadow});
			new ControlView({model: boxShadow});
		 }
	})
;

new AppView;

});
