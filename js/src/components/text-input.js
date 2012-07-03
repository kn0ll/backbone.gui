Backbone.GUI = (function(GUI) {

	GUI.TextInput = Backbone.GUI.Component.extend({

	  options: {
	    property: false
	  },

	  events: {
	    'submit form': 'changeInput'
	  },

	  template: '<div class="component">' +
	    '<form class="text">' +
	      '<input />' +
	    '</form>' +
	  '</div>',

	  setVal: function(val) {
	    this.$input.val(val);
	  },

	  changeInput: function(e) {
	    var val = this.$input.val();
	    this.model.set(this.options.property, val);
	    e.preventDefault();
	  },

	  setElement: function($el) {
	    this.$input = $('input', $el);
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  }

	});

	return GUI;

})(Backbone.GUI);