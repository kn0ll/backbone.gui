Backbone.GUI = (function(GUI) {

	// options
	// `mode` (default: `hold`): `hold` for intantaneous or `trigger` for toggle
	// `action` (optional): a function, or string representing a model's action by key
	//                      triggered *when* true is set if `trigger`, and *while* true is set if `hold`
	// `property` (optional): a boolean property to set `true` or `false`
	// `label` (optional): label for the button

	GUI.HoldButton = Backbone.GUI.Component.extend({

	  options: {
	    action: false,
	    label: false
	  },

	  events: {
	    'mousedown input': 'click'
	  },

	  template: '<div class="bb-gui-component"><input type="button" class="button" /></div>',

	  setVal: function(val) {
      	this.$input[val? 'addClass': 'removeClass']('true');
	  },

	  click: function(e) {

	    var model = this.model,
	      opts = this.options,
	      prop = opts.property,
	      action = opts.action,
	      method,
	      interval;

	    // if there's a `property`
	    // this button should set boolean for that property
	    if (prop) {
	      model.set(prop, !model.get(prop));
	      $(window).one('mouseup.button', function() {
	        model.set(prop, !model.get(prop));
	      });

	    // if there's an `action`
	    // this button should also trigger a function
	    } else if (action) {
	      method = _.isFunction(action)? action: model[action];
	      interval = setInterval(method);
	      $(window).one('mouseup.button', function() {
	        clearInterval(interval);
	      });

	    }

	    e.preventDefault();

	  },

	  setElement: function($el) {
	  	var opts = this.options,
	  		label = opts.label,
	  		prop = opts.property,
	  		action = this.options.action;
	    this.$input = $('input', $el);
	    this.$input.attr('value', label || prop || (_.isString(action)? action: 'Unknown'));
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  }

	});

	GUI.TriggerButton = GUI.HoldButton.extend({

	  events: {
	    'mousedown': 'click'
	  },

	  template: '<div class="bb-gui-component"><input type="button" class="button" /></div>',

	  click: function(e) {

	    var model = this.model,
	      opts = this.options,
	      prop = opts.property,
	      action = opts.action,
	      method,
	      interval;

	    // if there's a `property`
	    // this button should set boolean for that property
	    if (prop) {
	      model.set(prop, !model.get(prop));

	    // if there's an `action`
	    // this button should also trigger a function
	    } else if (action) {
	      method = _.isFunction(action)? action: model[action];
	      method();

	    }

	    e.preventDefault();

	  }

	});

	return GUI;

})(Backbone.GUI);