Backbone.GUI.TextInput = (function() {

	return Backbone.GUI.Component.extend({

	  options: {
	    property: false
	  },

	  events: {
	    'submit': 'changeInput'
	  },

	  template: '<form class="text">' +
	    '<input />' +
	  '</form>',

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

})();