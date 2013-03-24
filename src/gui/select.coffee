define [
  './component'
], (Component) ->

  class extends Component

    # this view is a select input
    tagName: 'select'

    # set <option>s for the select
    render: ->
      options = @options.options
      defaultVal = @model.get(@options.property)
      @$el.empty()
      for name in options
        option = document.createElement('option')
        option.innerHTML = name
        option.setAttribute('value', name)
        @$el.append option
        if name is defaultVal
          option.selected = true

      Component::render.apply @, arguments