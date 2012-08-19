Backbone.GUI = (function(GUI) {

  // ## Backbone.GUI.Component
  // the base class for all Backbone.GUI components.
  GUI.Component = Backbone.View.extend({

    // whenever a component is created, we should
    // bind all property value changes to this specific component.
    initialize: function(opts) {

      Backbone.View.prototype.initialize.apply(this, arguments);
      _.extend(this.options, opts);

      var self = this,
        model = self.model,
        prop = this.options.property;

      if (model && prop) {
        model.on('change:' + prop, function(model, val) {
          self.setVal(val);
        });
      }

    },

    // whenever the component view renders,
    // we should set the initial component value based
    // on the current property value.
    setElement: function() {
      var model = this.model;
      Backbone.View.prototype.setElement.apply(this, arguments);
      this.setVal(model? model.get(this.options.property): 0);
    },

    // setVal is responsible for setting the component view
    // style based on the property value. override this based
    // on your type of component.
    setVal: function() {
    },

    render: function() {
      this.setElement($(this.template));
      return this;
    }

  });

  // ## Backbone.GUI.View
  // a view which will create a collection of components
  // by inferring types of all the model's attributes.
  GUI.View = Backbone.View.extend({

    template: '<div class="bb-gui"></div>',
    row_template: '<div class="row"><% if (key) { %><span class="label"><%= key %></span><% } %></div>',

    initialize: function(opts) {
      this.gui = opts.gui;
      Backbone.View.prototype.initialize.apply(this, arguments);
    },

    // `render` returns a view created a several subviews;
    // one subview for each property of the model.
    render: function() {
        
      var model = this.model,
        $el = $(this.template),
        user_opts = this.gui || {},
        row_template = _.template(this.row_template);

      // create a component for each attribute
      // of the model
      _.each(model.attributes, function(attr, key) {

        var GUI = Backbone.GUI,
          type = typeof(attr),
          cur_opts = user_opts[key],
          cur_opts_advanced = !_.isString(cur_opts),
          opts = _.extend({ model: model, property: key }, cur_opts_advanced? cur_opts: {}),
          $row,
          view;

        // pass in `component` option to 
        // bypass component inference
        if (!cur_opts_advanced || opts.component) {

          // options is a hash of options
          // who defines a `component`
          if (cur_opts_advanced) {
            component = opts.component;

          // options is a string, simply defining component
          } else {
            component = cur_opts;
          }

        // if no `component` was declared in this.gui
        // infer component from type
        } else {
          switch (type) {
            case 'string':
              component = 'TextInput'
              break;
            case 'number':
              component = 'HorizontalSlider';
              break;
            case 'boolean':
              component = 'TriggerButton';
              break;
          }
        }

        // set this.gui[key] to `null`
        // to not render the component
        if (user_opts[key] !== null) {
          needs_label = ['HoldButton', 'TriggerButton'].indexOf(component) == -1
          $row = $(row_template({ key: needs_label? key: false }))
          view = new Backbone.GUI[component](opts);
          $row.append(view.render().el);
          $el.append($row);
        } 

      });
      
      this.setElement($el);
      return this;

    }

  });

  return GUI;

})({});