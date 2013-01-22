define [
  './component'
], (Component) ->

  class extends Component

    # this view is an input
    tagName: 'input'

    # of type button
    attributes:
      type: 'button'

    events:
      'click': 'click'

    # set dynamic attributes based on options
    constructor: (options = {}) ->
      @attributes.value = options.method
      Component::constructor.apply @, arguments

    click: ->
      do @model[@options.method]