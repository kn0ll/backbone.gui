Backbone.GUI = {};

Backbone.GUI.Component = (function() {

  return Backbone.View.extend({

    initialize: function(opts) {

      Backbone.View.prototype.initialize.apply(this, arguments);
      _.extend(this.options, opts);

      var self = this,
        model = self.model,
        prop = this.options.property;

      // update the slider position
      // when the model property changes
      if (model && prop) {
        model.bind('change:' + prop, function(model, val) {
          self.setVal(val);
        });
      }

    },

    setElement: function() {
      var model = this.model;
      Backbone.View.prototype.setElement.apply(this, arguments);
      this.setVal(model? model.get(this.options.property): 0);
    },

    setVal: function() {
    },

    render: function() {
      this.setElement($(this.template));
      return this;
    }


  });

})();

Backbone.GUI.View = Backbone.View.extend({

  template: '<div class="gui"></div>',

  initialize: function(opts) {
    this.gui = opts.gui;
    Backbone.View.prototype.initialize.apply(this, arguments);
  },

  render: function() {
      
    var model = this.model,
      $el = $(this.template),
      user_opts = this.gui || {};

    // create a component for each attribute
    // of the model
    _.each(model.attributes, function(attr, key) {

      var GUI = Backbone.GUI,
        type = typeof(attr),
        opts = _.extend({ model: model, property: key }, user_opts[key]),
        view;

      // pass in `component` option to 
      // bypass component inference
      if (opts.component) {
        component = opts.component;

      // if no `component` was declared in this.gui
      // infer component from type
      } else {
        switch (type) {
          case 'string':
            component = 'TextInput'
            break;
          case 'number':
            component = 'Slider';
            break;
          case 'boolean':
            component = 'Button';
            break;
        }
      }

      // set this.gui[key] to `null`
      // to not render the component
      if (user_opts[key] !== null) {
        view = new Backbone.GUI[component](opts);
        $el.append(view.render().el);
      } 

    });
    
    this.setElement($el);
    return this;

  }

});Backbone.GUI.Button = (function() {

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

})();Backbone.GUI.Selector = (function() {

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

})();Backbone.GUI.Slider = (function() {

	var VerticalSlider = Backbone.GUI.Component.extend({

	  options: {
	    property: false,
	    min: 0,
	    max: 100
	  },

	  events: {
	    'mousedown .grip': 'startSlide'
	  },

	  template: '<div class="vertical slider">' +
	    '<div class="track">' +
	      '<div class="grip"></div>' +
	    '</div>' +
	  '</div>',

	  setVal: function(val) {

	    var height_range = 100,
	      val_range = this.options.max - this.options.min,
	      ratio = (val - this.options.min) / val_range,
	      height = height_range * ratio;

	    this.$track.height(height + '%');

	  },

	  startSlide: function(e) {
	    $(window).on('mousemove.slider', _.bind(this.onSlide, this));
	    $(window).one('mouseup',this.stopSlide);
	  },

	  stopSlide: function() {
	    $(window).off('mousemove.slider');
	  },

	  onSlide: function(e) {

	    // calculate new value based on
	    // el position, el offset, and mouse position
	    var model = this.model,
	      opts = this.options,
	      $el = this.$el,
	      height = $el.height(),                  // height of el
	      top = $el.offset().top,                 // top px of el
	      bottom = top + height,                  // bottom px of el
	      rel_y_px = bottom - e.clientY,          // px from bottom user clicked
	      rel_y = (rel_y_px / height),            // % from bottom user clicked
	      range_y = opts.max - opts.min,          // total range of values
	      new_val = opts.min + (range_y * rel_y), // the new value
	      normalized_val;

	    if (new_val < opts.min) {
	      normalized_val = opts.min;
	    
	    } else if (new_val > opts.max) {
	      normalized_val = opts.max
	    
	    } else {
	      normalized_val = new_val;
	    }

	    model.set(opts.property, normalized_val);

	  },

	  setElement: function($el) {
	    this.$track = $('.track', $el);
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  }

	});

	var HorizontalSlider = VerticalSlider.extend({

	  template: '<div class="horizontal slider">' +
	    '<div class="track">' +
	      '<div class="grip"></div>' +
	    '</div>' +
	  '</div>',

	  setVal: function(val) {

	    var width_range = 100,
	      val_range = this.options.max - this.options.min,
	      ratio = (val - this.options.min) / val_range,
	      width = width_range * ratio;

	    this.$track.width(width + '%');

	  },

	  onSlide: function(e) {

	    // calculate new value based on
	    // el position, el offset, and mouse position
	    var model = this.model,
	      opts = this.options,
	      $el = this.$el,
	      width = $el.width(),                    // width of el
	      left = $el.offset().left,               // left px of el
	      rel_x_px = e.clientX - left,            // px from left user clicked
	      rel_x = (rel_x_px / width),             // % from bottom user clicked
	      range_x = opts.max - opts.min,          // total range of values
	      new_val = opts.min + (range_x * rel_x), // the new value
	      normalized_val;

	    if (new_val < opts.min) {
	      normalized_val = opts.min;
	    
	    } else if (new_val > opts.max) {
	      normalized_val = opts.max
	    
	    } else {
	      normalized_val = new_val;
	    }

	    model.set(opts.property, normalized_val);

	  }

	});

	var RoundSlider = VerticalSlider.extend({

	  options: _.extend({
	    rotate: 120
	  }, VerticalSlider.prototype.options),

	  template: '<div class="round slider">' +
	    '<div class="track">' +
	      '<div class="grip"></div>' +
	    '</div>' +
	  '</div>',

	  setVal: function(val) {

	    var rotate_range = this.options.rotate * 2,
	      val_range = this.options.max - this.options.min,
	      ratio = (val - this.options.min) / val_range,
	      rotation = (rotate_range * ratio) - this.options.rotate;

	    this.$grip.css('-webkit-transform', 'rotate(' + rotation + 'deg)');

	  },

	  setElement: function($el) {
	    this.$grip = $('.grip', $el);
	    Backbone.GUI.Component.prototype.setElement.apply(this, arguments);
	  },

	});

	return Backbone.GUI.Component.extend({

	  options: {
	    style: 'horizontal'
	  },

	  initialize: function(opts) {
	    var style = this.options.style,
	      slider;
	    if (style == 'vertical') {
	      slider = VerticalSlider;
	    } else if (style == 'horizontal') {
	      slider = HorizontalSlider;
	    } else if (style == 'round') {
	      slider = RoundSlider
	    }
	    _.extend(this, slider.prototype);
	    slider.prototype.initialize.apply(this, arguments);
	  }

	});

})();Backbone.GUI.TextInput = (function() {

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