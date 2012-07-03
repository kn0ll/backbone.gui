var osc = new Backbone.Model({
    table: 50,
    intensity: 50,
    amp: 50
});

var view = new Backbone.GUI.View({
  
  model: osc,

  gui: {
  	table: 'Knob',
    intensity: 'Knob',
    amp: 'Knob'
  }

});

$('body').append(view.render().el);

var osc = new Backbone.Model({
    shape: 'sine',
    name: 'coolguy'
});

var view = new Backbone.GUI.View({
  
  model: osc,

  gui: {
  	shape: {
  		component: 'Dropdown',
  		options: ['sine', 'triangle', 'square']
  	}
  }

});

$('body').append(view.render().el);