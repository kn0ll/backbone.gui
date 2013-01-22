define [
  'backbone'
], (Backbone) ->

  class extends Backbone.View

    # bind element changing to
    # a function that sets the property value
    events:
      'change': 'setVal'

    # all changes to the property we are listening to
    # should be bound to render
    initialize: ->
      Backbone.View::initialize.apply @, arguments
      event_name = 'change:' + @options.property
      @listenTo @model, event_name, @render

    # changing the form input
    # should change the model state
    setVal: (e) ->
      new_val = do @$el.val
      @model.set @options.property, new_val,
        setting_view: this
      do e.preventDefault

    # rendering should create the element
    # and set it's initial value
    render: (model, val, options = {}) ->
      return @ if this is options.setting_view
      Backbone.View::render.apply @, arguments
      current_val = @model.get(@options.property)
      @$el.val current_val
      @