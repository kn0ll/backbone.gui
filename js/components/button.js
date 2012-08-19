Backbone.GUI = (function(GUI) {

	// ## Backbone.GUI.HoldButton
	// a button used to set the value of a boolean property. a hold button
	// will only set the value momentarily, while the button is being pressed.
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

	  // clicking the views primary button
	  // should set the value appropriately
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

	// ## Backbone.GUI.TriggerButton
	// a button used to set the value of a boolean property. a trigger button
	// is essentially a toggle- changing the boolean state on each click.
	GUI.TriggerButton = GUI.HoldButton.extend({

	  events: {
	    'mousedown': 'click'
	  },

	  template: '<div class="bb-gui-component"><input type="button" class="button" /></div>',

	  // clicking the views primary button
	  // should set the value appropriately
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