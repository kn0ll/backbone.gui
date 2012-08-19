Backbone.GUI = (function(GUI) {

	GUI.RadioButtons = Backbone.GUI.Component.extend({

	  options: {
	    property: false,
	    options: false
	  },

	  events: {
	    'click input': 'changeInput'
	  },

	  template: '<div class="bb-gui-component"><form class="radio"></form></div>',

	  setVal: function(val) {
	    this.$inputs.val([val]);
	  },

	  changeInput: function(e) {
	    var val = this.$inputs.filter(':checked').val();
	    this.model.set(this.options.property, val);
	  },

	  setElement: function($el) {
	    this.$inputs = $('input', $el);
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  },

	  render: function() {

	    var $el = $(this.template),
	      prop = this.options.property,
	      cid = this.cid,
	      $form = $('form', $el);

	    _.each(this.options.options, function(opt) {
	      $form.append('<div class="input"><input type="radio" name="' + cid + '-' + prop + '" value="' + opt + '" /><span>' + opt + '</span></div>');
	    });

	    this.setElement($el);
	    return this;

	  }

	});

	GUI.Dropdown = GUI.RadioButtons.extend({

	  options: {
	    property: false,
	    options: false
	  },

	  events: {
	    'change select': 'changeInput'
	  },

	  template: '<div class="bb-gui-component"><form class="dropdown"><select></select></form></div>',

	  changeInput: function(e) {
	    var val = this.$inputs.val();
	    this.model.set(this.options.property, val);
	  },

	  setElement: function($el) {
	    this.$inputs = $('select', $el);
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  },

	  render: function() {

	    var $el = $(this.template),
	      prop = this.options.property,
	      input_name = this,
	      $select = $('select', $el);

	    _.each(this.options.options, function(opt) {
	      $select.append('<option value="' + opt + '">' + opt + '</option>');
	    });

	    this.setElement($el);
	    return this;

	  }

	});

	return GUI;

})(Backbone.GUI);