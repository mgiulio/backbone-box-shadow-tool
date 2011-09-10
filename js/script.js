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

window.TodoView = Backbone.View.extend({
 tagName:  'li',

 // Cache the template function for a single item.
 template: _.template($('#item-template').html()),

 // The DOM events specific to an item.
 events: {
 },

 // The TodoView listens for changes to its model, re-rendering.
 initialize: function() {
	this.model.bind('change', this.render, this);
	this.model.bind('destroy', this.remove, this);
 },

 // Re-render the contents of the todo item.
 render: function() {
	$(this.el).html(this.template(this.model.toJSON()));
	return this;
 }
});

window.AppView = Backbone.View.extend({
 el: $("#todoapp"),

 // Our template for the line of statistics at the bottom of the app.
 statsTemplate: _.template($('#stats-template').html()),

 events: {
 },

 initialize: function() {
	Todos.bind('add',   this.addOne, this);
	Todos.bind('reset', this.addAll, this);
	Todos.bind('all',   this.render, this);

	Todos.fetch();
 },

 render: function() {
	this.$('#todo-stats').html(this.statsTemplate({
	  total:      Todos.length,
	  done:       Todos.done().length,
	  remaining:  Todos.remaining().length
	}));
 },
});

// Finally, we kick things off by creating the **App**.
window.App = new AppView;

});
