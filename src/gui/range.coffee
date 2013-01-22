define [
  './component'
], (Component) ->

  class extends Component

    # this view is an input
    tagName: 'input'

    # of type range
    attributes:
      type: 'range'

    # set dynamic attributes based on options
    constructor: (options = {}) ->
      @attributes.min = options.min
      @attributes.max = options.max
      @attributes.step = options.step
      Component::constructor.apply @, arguments