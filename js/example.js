var Osc = Backbone.Model.extend({
  defaults: {
    frequency: 50,
    shape: 'sine',
    on: false
  }
});

var osc = new Osc();

var view = new Backbone.GUI.View({
  model: osc
});

$('body').append(view.render().el);