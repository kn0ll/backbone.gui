Backbone.GUI.Button = (function() {

	// options
	// `mode` (default: `hold`): `hold` for intantaneous or `trigger` for toggle
	// `action` (optional): a function, or string representing a model's action by key
	//                      triggered *when* true is set if `trigger`, and *while* true is set if `hold`
	// `property` (optional): a boolean property to set `true` or `false`
	// `label` (optional): label for the button

	var HoldButton = Backbone.GUI.Component.extend({

	  options: {
	    action: false,
	    property: false,
	    label: false
	  },

	  events: {
	    'mousedown': 'click'
	  },

	  template: '<input type="button" class="button" />',

	  setVal: function(val) {

	    var action = this.options.action;

	    if (action) {
	      this.$el.attr('value', _.isString(action)? action: 'trigger');

	    } else {
	      this.$el[val? 'addClass': 'removeClass']('true');
	    }

	  },

	  click: function(e) {

	    var model = this.model,
	      opts = this.options,
	      prop = opts.property,
	      mode = opts.mode,
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

	  render: function() {
	    Backbone.GUI.Component.prototype.render.apply(this, arguments);
	    this.$el.attr('value', this.options.label || this.options.property || 'Unknown');
	    return this;
	  }

	});

	var TriggerButton = HoldButton.extend({

	  events: {
	    'mousedown': 'click'
	  },

	  template: '<input type="button" class="button" />',

	  click: function(e) {

	    var model = this.model,
	      opts = this.options,
	      prop = opts.property,
	      mode = opts.mode,
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

	return Backbone.GUI.Component.extend({

	  options: {
	    mode: 'trigger'
	  },

	  initialize: function(opts) {
	    var button = this.options.mode == 'hold'? HoldButton: TriggerButton;
	    _.extend(this, button.prototype);
	    button.prototype.initialize.apply(this, arguments);
	  }

	});

})();