define [
  './component'
], (Component) ->

  class extends Component

    # this view is an input
    tagName: 'input'

    # of type checkbox
    attributes:
      type: 'checkbox'

    # override setVal because this uses different
    # function to access element value
    setVal: (e) ->
      new_val = @$el.prop('checked')
      @model.set @options.property, new_val,
        setting_view: this
      do e.preventDefault

    # set default value
    render: ->
      default_val = @model.get(@options.property)
      @$el.prop 'checked', default_val

      Component::render.apply @, arguments