backbone.gui
===

somewhere in between backbone.ui and dat.gui. simply pass Backbone.GUI.View your model, and optionally some gui parameters, and it will generate controls to modify your model.

the code looks like this:

```
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
```

it makes a controller like this:

![osc screen](https://github.com/catshirt/backbone.gui/wiki/osc-screen.png)