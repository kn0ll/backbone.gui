var osc = new Backbone.Model({
  shape: 'Sine',
  gain: 1.5,
  frequency: 440,
  on: false
});

var osc_view = new Backbone.GUI.View({

  model: osc,

  gui: {

    shape: {
      component: 'Dropdown',
      options: ['Sine', 'Square', 'Saw', 'Pulse', 'Triangle', 'WhiteNoise']
    },

    gain: {
      min: 0,
      max: 2
    },

    frequency: {
      min: 0,
      max: 1000
    }

  }

});

$('body').append(osc_view.render().el);