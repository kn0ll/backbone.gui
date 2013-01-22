require.config
  name: 'backbone.gui'

  paths:
    zepto: 'lib/zepto'
    lodash: 'lib/lodash'
    backbone: 'lib/backbone'

  shim:
    
    backbone:
      deps: ['lodash', 'zepto']
      exports: 'Backbone'

    zepto:
      exports: 'Zepto'

define [
  './gui/button',
  './gui/checkbox',
  './gui/range',
  './gui/select',
  './gui/text'
], (Button, Checkbox, Range, Select, Text) ->

  Button: Button
  Checkbox: Checkbox
  Range: Range
  Select: Select
  Text: Text