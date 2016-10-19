class exports.CardView
	constructor: (opts={}) ->
		# options
		opts.contents ?= []
		opts.arrowColor ?= "rgba(0,0,0,0.4)"
		opts.title ?= null
		opts.tintColor ?= "#000"
		@topInset = 80
		@bottomInset = 300

		# create base view layer
		view = new Layer
			frame: {x: 0, y: 0, width: Screen.width, height: Screen.height*2}

		# create view background
		viewBg = new Layer
			backgroundColor: "#fff"
		viewBg.style = {"border-radius":"20px 20px 0 0","border":"2px solid rgba(0,0,0,0.2)"}
		viewBg.frame = {width: Screen.width, height: Screen.height + @bottomInset}
		viewBg.parent = view
		viewBg.name = "viewBg"

		# create view cover
		@viewCover = viewBg.copy()
		@viewCover.name = "viewCover"
		@viewCover.backgroundColor = "#{opts.tintColor}"
		@viewCover.parent = view

		# create hide button (svg element)
		@hideBtn = new Layer
		hideBtnWidth = 90
		hideBtnHeight = 29
		header = "<svg class='hideBtn' x='0px' y='0px' width='#{hideBtnWidth}' height='#{hideBtnHeight}' viewBox='0 0 #{hideBtnWidth} #{hideBtnHeight}'>"
		path = '<path d="M45.047142,14.0108354 L9.76468939,0.476890323 C6.04890606,-0.948441643 1.88914944,0.929180624 0.473612939,4.67067704 C-0.941923567,8.41217345 0.922794917,12.6007154 4.63857824,14.0260474 L42.4369444,28.5250682 C44.0877822,29.1583106 45.9122178,29.1583106 47.5630556,28.5250682 L85.3614218,14.0260474 C89.0772051,12.6007154 90.9419236,8.41217345 89.5263871,4.67067704 C88.1108506,0.929180624 83.9510939,-0.948441643 80.2353106,0.476890323 L45.047142,14.0108354 Z"></path>'
		footer = "</svg>"
		@hideBtn.html = header + path + footer
		@hideBtn.width = hideBtnWidth
		@hideBtn.height = hideBtnHeight
		@hideBtn.x = Align.center
		@hideBtn.y = 33
		@hideBtn.backgroundColor = null
		@hideBtn.style = {"fill":"#{opts.arrowColor}"}
		@hideBtn.name = "hideBtn"
		@hideBtn.parent = view

		# create scroll component
		@scroll = ScrollComponent.wrap(view)
		@scroll.contentInset = {top: @topInset, right: 0, bottom: -@bottomInset, left: 0}
		@scroll.content.y = @topInset
		@scroll.content.style = {"border-radius":"20px 20px 0 0"}
		@scroll.scrollHorizontal = false
		@scroll.topInset = @topInset

		# make sure the viewcover and hidebtn stay on top of other layers
		@scroll.content.on "change:children", =>
			Utils.delay 0.01, =>
				@hideBtn.bringToFront()
				@viewCover.bringToFront()

		# add contents
		if typeof opts.contents == "object"
			opts.contents = [opts.contents]
		for layer in opts.contents
			layer.parent = @scroll.content

		# add title
		if opts.title isnt null
			@title = new Layer
				width: Screen.width
			@title.html = opts.title
			@title.backgroundColor = ''
			@title.style = {
				"fontFamily":"SanFranciscoDisplay-Bold",
				"fontSize":"80px",
				"color":"rgba(0,0,0,0.4)",
				"text-align":"center"
			}
			@title.parent = @scroll.content
			@title.x = 0
			@title.y = 140
			@title.name = "title"

		# setup layer states
		@scroll.originalFrame = @scroll.frame

		@scroll.states.add
			offscreen: {y: Screen.height, scale: 1, opacity: 1}
			frontPosition: {y: @scroll.originalFrame.y, scale: 1, opacity: 1}
			backPosition: {y: @scroll.originalFrame.y-90, scale: 0.9, opacity: 1}
			fanned: {scale: 0.95, opacity: 1}
		@scroll.content.states.add
			home: {y: 80}
		@viewCover.states.add
			visible: {opacity: 0.5}
			hidden: {opacity: 0}
		@hideBtn.states.add
			visible: {opacity: 1}
			hidden: {opacity: 0}

		@scroll.states.switchInstant "offscreen"
		@viewCover.states.switchInstant "hidden"
		@hideBtn.states.switchInstant "visible"

		animationCurve = {curve:"spring-dho(150,20,1,0)"}
		@scroll.states.animationOptions = animationCurve
		@viewCover.states.animationOptions = animationCurve
		@hideBtn.states.animationOptions = animationCurve

		# toggle states of layers based on the scrollview's state
		@scroll.on Events.StateWillSwitch, (from, to) =>
			if to is "backPosition"
				@viewCover.states.switch "visible"
				@viewCover.ignoreEvents = false
				@hideBtn.states.switch "hidden"
				if @scroll.content.y < 80
					Utils.delay 0.05, =>
						@scroll.content.states.switch "home", {time: 0.2}
				@scroll.scroll = false
			if to is "frontPosition"
				@viewCover.states.switch "hidden"
				@viewCover.ignoreEvents = true
				@hideBtn.states.switch "visible"
				@scroll.scrollVertical = true
			if to is "fanned"
				@viewCover.states.switch "hidden"
				@viewCover.ignoreEvents = false
				@hideBtn.states.switchInstant "hidden"
				@scroll.scroll = false
	# helpers for Manager
	getViewCover: -> return @viewCover
	getScrollView: -> return @scroll
	getHideBtn: -> return @hideBtn



class exports.Manager
	constructor: (opts={}) ->
		@viewIncrement = 0
		@viewStack = []
		opts.fanOut ?= true
		if opts.fanOut == true
			# init fanout stuff
			@cardsShouldFanOut = true
			@fanOutHitTarget = new Layer
				width: Screen.width
				height: 80
				backgroundColor: ''
			@fanOutHitTarget.visible = false
			@fanOutHitTarget.on Events.TouchEnd, =>
				@fanOutHitTarget.visible = false
				@fanOut()
			@targetPositioning = =>
				if @viewStack[0]
					scrollY = @viewStack[0].scroll.content.y
					yPos = Utils.modulate(scrollY, [80, 0], [0, -80], true)
					@fanOutHitTarget.y = yPos
		else
			@cardsShouldFanOut = false
	addView: (opts={}) ->
		# options
		opts.onDismiss ?= -> null
		opts.onPresent ?= -> null
		opts.title ?= null
		opts.tintColor ?= null

		# create view
		view = new exports.CardView
			contents: opts.contents
			title: opts.title
			tintColor: opts.tintColor
		view.isInStack = false

		# get references to layers in the view and name the scrollview
		view.hideBtn = view.getHideBtn()
		view.viewcover = view.getViewCover()
		view.scrollview = view.getScrollView()
		view.scrollview.name = "View_#{@viewIncrement}"
		@viewIncrement++

		view.onDismiss = opts.onDismiss
		view.onPresent = opts.onPresent

		# set up behaviors
		view.hideBtn.on Events.TouchEnd, =>
			@dismissCurrentView()
		if @cardsShouldFanOut == true
			view.viewcover.on Events.TouchEnd, =>
				@switchToView(view)

		# affix close button, and make views dismissable by swiping
		@addDragBehavior(view)
		return view

	presentView: (view) ->
		@shiftBack()
		view.scroll.content.y = 80
		view.scrollview.bringToFront()
		view.scrollview.states.switch("frontPosition")
		view.onPresent()
		if view.isInStack is false
			@viewStack.unshift(view)
			view.isInStack = true
		if @viewStack.length > 1 && @cardsShouldFanOut == true
			@fanOutHitTarget.visible = true
			@fanOutHitTarget.bringToFront()
			@viewStack[0].scroll.content.on("change:y", @targetPositioning)
	dismissCurrentView: =>
		if @viewStack[0]
			@viewStack[0].scrollview.states.switch "offscreen"
			@viewStack[0].isInStack = false
			@viewStack[0].onDismiss()
			if @fanOutHitTarget && @fanOutHitTarget.visible == true
				@viewStack[0].scroll.content.off("change:y", @targetPositioning)
			@viewStack.shift()
			@shiftForward()
			if @fanOutHitTarget && @cardsShouldFanOut == true && @viewStack.length < 2 && @fanOutHitTarget.visible == true
				@fanOutHitTarget.visible = false
	dismissViews: (views) ->
		for view in views
			view.scrollview.states.switch "offscreen"
			view.isInStack = false
			view.onDismiss()
			if @fanOutHitTarget && @fanOutHitTarget.visible == true
				view.scroll.content.off("change:y", @targetPositioning)
			if @fanOutHitTarget && @cardsShouldFanOut == true && @viewStack.length < 2 && @fanOutHitTarget.visible == true
				@fanOutHitTarget.visible = false
			@viewStack = _.reject @viewStack, (viewitem) ->
				viewitem.scroll.index == view.scroll.index
		@shiftForward()
	switchToView: (view) ->
		fanCurve = "spring(300,25,0)"
		thisIndex = view.scroll.index
		viewsToDismiss = []
		viewsToBackPosition = []
		viewToFront = null
		for layer in @viewStack
			if layer.scroll.index > thisIndex
				viewsToDismiss.push(layer)
			if layer.scroll.index < thisIndex
				viewsToBackPosition.push(layer)
			if layer.scroll.index == thisIndex
				viewToFront = layer.scroll
		@dismissViews(viewsToDismiss)
		for layer in viewsToBackPosition
			layer.scroll.states.switch "backPosition", {curve: fanCurve}
		viewToFront.states.switch "frontPosition", {curve: fanCurve}
		for view in @viewStack
			view.scroll.content.animate
				properties:
					y: view.scroll.topInset
				curve: fanCurve
		if @viewStack.length > 1 && @cardsShouldFanOut == true && @fanOutHitTarget.visible == false
			@fanOutHitTarget.visible = true
			@fanOutHitTarget.bringToFront()
			@viewStack[0].scroll.content.on("change:y", @targetPositioning)
	shiftForward: ->
		if @viewStack[0]
			@viewStack[0].scrollview.states.switch "frontPosition"
	shiftBack: ->
		for view in @viewStack
			if view.scrollview.states.current.name isnt "backPosition"
				view.scrollview.states.switch "backPosition"
	getCardsBelow: ->
		return _.rest(@viewStack)
	addDragBehavior: (view) ->
		view.scrollview.content.on "change:y", ->
			yOffset = view.scrollview.content.y
			view.hideBtn.y = Utils.modulate(yOffset, [0, -10000], [33, 10033], true)
		view.scrollview.content.draggable.on Events.DragEnd, =>
			yOffset = view.scrollview.content.y
			if yOffset > 150
				@dismissCurrentView()
	fanOut: ->
		i = 1
		offset = 155
		fanCurve = "spring(300,25,0)"
		if @viewStack.length > 1 && @cardsShouldFanOut == true
			for view in @viewStack
				view.scroll.states.switch "fanned", {curve: fanCurve}
				view.scroll.content.animate
					properties:
						y: 0
					curve: fanCurve
				view.scroll.animate
					properties:
						y: 0
					curve: fanCurve
			fan = _.initial(@viewStack).reverse()
			for view in fan
				view.scroll.animate
					properties:
						y: i*offset
					curve: fanCurve
				i++
