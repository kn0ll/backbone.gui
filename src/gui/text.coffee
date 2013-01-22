define [
  './component'
], (Component) ->

  class extends Component

    # this view is an input
    tagName: 'input'

    # of type text
    attributes:
      type: 'text'