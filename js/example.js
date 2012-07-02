var osc = new Backbone.Model({
    frequency: 440,
    shape: 'sine',
    on: false
});

var view = new Backbone.GUI.View({
  
  model: osc,

  gui: {

  	frequency: {
  		min: 0,
  		max: 1000
  	},

  	shape: {
  		component: 'Selector',
  		style: 'dropdown',
  		options: ['sine', 'saw', 'square']
  	},

  	on: {
  		mode: 'hold'
  	}

  }

});

$('body').append(view.render().el);