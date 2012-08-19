# backbone.gui

the simplest way to create interfaces for your backbone models. something in between [backbone-ui](http://perka.github.com/backbone-ui/) and [dat.gui](http://workshop.chromeexperiments.com/examples/gui). backbone.gui provides backbone views you can use as sliders, buttons, inputs, etc. to controll your backbone model properties.

## installation

backbone.gui, naturally, requires backbone as a dependency. additionally, you'll want to include [backbone.gui.js](https://raw.github.com/catshirt/backbone.gui/master/dist/backbone.gui.js), and optionally [backbone.gui.css](https://raw.github.com/catshirt/backbone.gui/master/dist/backbone.gui.css).

## use

you can use backbone.gui components as you would any other backbone views.

### component

this base component for all backbone.gui views. alone, this view has no render method, and thus does nothing.

- `model` - the model who's properties you'd like to modify
- `property` - the key of the model's attribute you would like to modify

typically, with some exceptions, every component must be given a `model` and a `property`. other options have a default value unless otherwise noted. all components render following the traditional backbone pattern: calling render returns the itself, allowing you to chain: `component.render().el`. all examples below will use the following model for reference:

```
var example = new Backbone.Model({
  frequency: 440,
  shape: 'sine',
  on: false
}); 
```

### HorizontalSlider

a horizontal slider, used for controlling numbers.

- `min` - minimum value (left of slider)
- `max - maximum value (right of slider)

```
var view = new Backbone.GUI.HorizontalSlider({
  model: example,
  property: 'frequency',
  min: 0,
  max: 1000
});
```

### VerticalSlider

a vertical slider, used for controlling numbers.

- `min` - minimum value (bottom of slider)
- `max - maximum value (top of slider)

```
var view = new Backbone.GUI.VerticalSlider({
  model: example,
  property: 'frequency',
  min: 0,
  max: 1000
});
```

### Knob

essentially a round slider,, used for controlling numbers.

- `min` - minimum value (bottom of slider)
- `max - maximum value (top of slider)
- `rotate` - maximum rotation angle

```
var view = new Backbone.GUI.Knob({
  model: example,
  property: 'frequency',
  min: 0,
  max: 1000
});
```

### Dropdown

a dropdown menu, used for setting string properties.

- `options` - array of values for the dropdown

```
var view = new Backbone.GUI.Dropdown({
  model: example,
  property: 'shape',
  options: ['Sine', 'Square', 'Saw']
});
```

### RadioButtons

a radio buttons menu, used for setting string properties.

- `options` - array of values for the radio buttons

```
var view = new Backbone.GUI.RadioButtons({
  model: example,
  property: 'shape',
  options: ['Sine', 'Square', 'Saw']
});
```

### TextInput

a simple unrestricted text input used for setting strings.

```
var view = new Backbone.GUI.TextInput({
  model: example,
  property: 'shape'
});
```

### TriggerButton

a button who toggles a boolean value, or executes a function, only once each time it's pressed.

- `label` - a text label for the button
- `action` - instead of passing a `property` option, TriggerButton will accept an arbitrary function to execute. alternatively, `action` can be a string, representing the name of the property of the model which is a function.

```
var view = new Backbone.GUI.TriggerButton({
  model: example,
  property: 'on'
});  
```

```
var view = new Backbone.GUI.TriggerButton({
  label: 'log',
  action: function() {
    console.log('i will log whenever i am clicked');
  }
});
```

### HoldButton

a button who toggles a boolean value, or executes a function, only while it is held down.

- `label` - a text label for the button
- `action` - instead of passing a `property` option, HoldButton will accept an arbitrary function to execute. alternatively, `action` can be a string, representing the name of the property of the model which is a function.

```
var view = new Backbone.GUI.HoldButton({
  model: example,
  property: 'on'
});  
```

```
var view = new Backbone.GUI.HoldButton({
  label: 'log',
  action: function() {
    console.log('i will log repeatedly while i am pressed');
  }
});
```

### View

a high level component who only accepts two options: `model` and `gui`. this component will render a combination of sliders, inputs, and buttons, inferred by the attributes of your model.

- `model` - a model who's attributes you'd like gui-fied
- `gui` - a custom configuration to override the inferred defaults (optional)

```
var view = new Backbone.GUI.View({
  model: example,
  gui: {
    frequency: {
      min: 0,
      max: 1000
    },
    shape: {
      component: 'Dropdown',
      options: ['Sine', 'Saw', 'Square']
    }
  }
});
```

## building documentation

[formatted documentation](http://catshirt.github.com/backbone.gui) is available and can be built using groc:

```
npm install -g groc
groc js/**/*.js readme.md
```