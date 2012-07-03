Backbone.GUI = (function(GUI) {

  GUI.Component = Backbone.View.extend({

    initialize: function(opts) {

      Backbone.View.prototype.initialize.apply(this, arguments);
      _.extend(this.options, opts);

      var self = this,
        model = self.model,
        prop = this.options.property;

      // update the slider position
      // when the model property changes
      if (model && prop) {
        model.on('change:' + prop, function(model, val) {
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

  GUI.View = Backbone.View.extend({

    template: '<div class="gui"></div>',
    row_template: '<div class="row"><% if (key) { %><span class="label"><%= key %></span><% } %></div>',

    initialize: function(opts) {
      this.gui = opts.gui;
      Backbone.View.prototype.initialize.apply(this, arguments);
    },

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