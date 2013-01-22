# backbone.gui

backbone.gui is a simple way to create interfaces for your Backbone models. aiming for simplicity, this relies solely on html5 input elements.

## including backbone.gui

loading backbone.gui relies on requirejs. simply clone backbone.gui into your project repository and create the path in your requirejs config. if you cloned into `lib/backbone.gui`, it would look something like this:

```
gui: 'lib/backbone.gui/src/gui'
```

## using components

gui components are all extended from Backbone views. they all accept a `model` option, which they will bind user input to. most components have a `property` option which defines what model property the input should bind to, and many components have an `options` parameter to define further gui attributes. consider the following model definition for all examples:

```
define 'user', [
  'backbone'
], (Backbone) ->
  
  User = class extends Backbone.Model
    defaults:
      admin: null
      username: null
      age: null

    greet: ->
      console.log 'hello, ', @get('username')

  new User
    admin: false
    username: 'nic'
    age: 24
```

### Text Input

for strings.

```
define 'user', [
  'zepto',
  'user',
  'gui/text'
], ($, user, TextView) ->

  username_view = new TextView
    model: user
    property: 'username'

  $ ->
    $body = $('body')
    $body.append username_view.render().el
```

### Range Input

for integers. additionally accepts `min`, `max`, and `step` options for input attributes.

```
age_view = new RangeView
  model: user
  property: 'age'
  min: 0
  max: 150
```

### Select Dropdown

for strings. accepts an `options` array for possible dropdown values.

```
username_view = new SelectView
  model: user
  property: 'username'
  options: ['catshirt', 'nic', 'cool-guy-247']
```

### Checkbox Input

for booleans.

```
admin_view = new CheckboxView
  model: user
  property: 'admin'
```

### Button

for instance methods. unlike other components, this does not accept a `property` and instead accepts a `method`, which is the name of an instance method to trigger.

```
greet_view = new ButtonView
  model: user
  method: 'greet'
```

## compiling, developing

a config file is included for Grunt tasks to compile and bundle backbone.gui.

```
$ grunt coffee
$ grunt requirejs
```

## todo

- get requirejs build to properly build while ignoring backbone dependency
- figure out how to package stand-alone script without need for module loader
