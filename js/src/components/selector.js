Backbone.GUI.Selector = (function() {

	var RadioButtons = Backbone.GUI.Component.extend({

	  options: {
	    property: false,
	    options: false
	  },

	  events: {
	    'click input': 'changeInput'
	  },

	  template: '<form class="radio"></form>',

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
	      cid = this.cid;

	    _.each(this.options.options, function(opt) {
	      $el.append('<div class="input"><input type="radio" name="' + cid + '-' + prop + '" value="' + opt + '" /><span>' + opt + '</span></div>');
	    });

	    this.setElement($el);
	    return this;

	  }

	});

	var Dropdown = RadioButtons.extend({

	  options: {
	    property: false,
	    options: false
	  },

	  events: {
	    'change select': 'changeInput'
	  },

	  template: '<form class="dropdown"><select></select></form>',

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

	return Backbone.GUI.Component.extend({

	  options: {
	    style: 'radio'
	  },

	  initialize: function(opts) {
	    var select = this.options.style == 'radio'? RadioButtons: Dropdown;
	    _.extend(this, select.prototype);
	    select.prototype.initialize.apply(this, arguments);
	  }

	});

})();