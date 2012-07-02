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

});