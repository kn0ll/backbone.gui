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

  render: function() {
      
    var model = this.model,
      $el = $(this.template);

    _.each(model.attributes, function(attr, key) {

      var GUI = Backbone.GUI,
        type = typeof(attr),
        opts = { model: model, property: key },
        view;

      switch (type) {

        case 'string':
          view = new GUI.TextInput(opts);
          break;

        case 'number':
          view = new GUI.Slider(_.extend({
            style: 'horizontal'
          }, opts));
          break;

        case 'boolean':
          view = new GUI.Button(opts);
          break;

      }

      $el.append(view.render().el);

    });

    this.setElement($el);
    return this;

  }

});