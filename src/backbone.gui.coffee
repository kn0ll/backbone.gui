require.config
  name: 'backbone.gui'

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
