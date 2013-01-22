define [
  'zepto',
  './component'
], ($, Component) ->

  class extends Component

    # this view is a select input
    tagName: 'select'

    # set <option>s for the select
    render: ->
      options = @options.options
      defaultVal = @model.get(@options.property)
      @$el.empty()
      for name in options
        $option = $('<option />')
        $option
          .text(name)
          .val(name)
          .appendTo(@$el)
        if name is defaultVal
          $option.prop 'selected', true

      Component::render.apply @, arguments