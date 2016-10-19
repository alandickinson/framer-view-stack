# Framer ViewStack Module

This is a module for the prototyping tool [Framer](http://framerjs.com). It helps you create and control views that stack on top of each other. You can swipe to dismiss them, or fan out the stack and select one to bring forward.

Swipe to dismiss | Tap to fan out | Scroll
---|---|---
<img src="http://inpo.co/viewstack/vs-swipe-exp.gif" width="200px"/> | <img src="http://inpo.co/viewstack/vs-fan-out-sm.gif" width="200px"/> | <img src="http://inpo.co/viewstack/vs-scrolling-exp.gif" width="200px"/>

### Installation
* Download the project from Github
* Copy `viewstack.coffee` into the modules folder of your Framer project.
* Import the module into your project by adding this line: `ViewStack = require "viewstack"`

### Usage

**Setup**

Create the view stack, and then add a view to it using the `addView` method.

```coffeescript
stack = new ViewStack.Manager

myview = stack.addView
  contents: myLayer
 ```

 `contents` is required and can be a layer or an array of layers. These will get added to the view's ScrollView in the order they appear in the array, so list the elements from bottom to top. The ScrollView allows vertical scrolling, and its content layer is sized to fit the content you pass into it.

The view gets added but is kept off screen. To display it, use the `presentView` method.

**All addView Options**
```coffeescript
myview = stack.addView
  contents: myLayer
  title: "My View"    # default: no title
  tintColor: "#fff"   # defualt: "#000"
  arrowColor: "#000"  # default: "rgba(0,0,0,0.4)"
 ```

**Presenting Views**

Use the `presentView` method to display a view on screen.

```coffeescript
stack.presentView(myview)
```

When more than one view has been presented, they will stack.

### Example

```coffeescript
# create content layers
one = new Layer
  frame: Screen.frame
  backgroundColor: "rgba(0,128,255,1)"
two = new Layer
  frame: Screen.frame
  backgroundColor: "rgba(255,128,0,1)"

# create stack manager
ViewStack = require "viewstack"
stack = new ViewStack.Manager

# add views to the stack, passing in sketch layers with the contents parameter
view_one = stack.addView
	contents: one
	title: "One"
	tintColor: "#000"
view_two = stack.addView
	contents: two
	title: "Two"
	tintColor: "#000"

# add tap events to present views
one.on Events.Tap, ->
	stack.presentView(view_two)

# present first view
stack.presentView(view_one)
```


**Fanning Out**

When views are stacked onscreen tapping the top area will fan all of them out and let you select one. This is enabled by default, but you can turn it off by setting the fanOut parameter to false when you create the view stack.

```coffeescript
stack = new ViewStack.Manager
  fanOut: false
```

You can also fan out the current stack of views programmatically with `stack.fanOut()` -- If there's more than one view on screen and the feature hasn't been disabled.

### Managing Views

**Changing Views**
* `stack.dismissViews([views])` takes an array of views and will dismiss all of them.
* `stack.dismissCurrentView` dismisses the view that's currently on top.
* `stack.switchToView(view)` rearranges the stack to move a specific view to the front. This will dismiss any views that are above the view you pass in.

**Helpers**

Views have helper methods you can use to get access to specific layers.

* `myview.getScrollView()` returns the ScrollComponent.
* `myview.getViewCover()` returns the cover layer used to dim the view when its behind others.
* `myview.getHideBtn()` returns the hide button.

-----

### To do
* Fix a bug in the fanned out touch events
* Add some error handling
* Add more event hooks
* Maybe just subclass Layer?
* Make things more customizable -- animation curves, card styling, dismiss button, stack offset, etc.
* Adjust the stacking offsets for different screen ratios (currently works best with iPhone 6 ratio)
