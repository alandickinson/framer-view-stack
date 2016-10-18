# Framer ViewStack Module

This is a module for the prototyping tool [Framer](http://framerjs.com). It helps you create and control views that stack on top of each other. You can swipe to dismiss them, or fan out the stack and select one to bring forward.

Swipe to dismiss | Tap to fan out
---|---
<img src="http://inpo.co/viewstack/swipe.gif" width="250px"/> | <img src="http://inpo.co/viewstack/tap-to-fan-out.gif" width="250px"/>

### Installation
* Download the project from Github
* Copy `viewstack.coffee` into the modules folder of your Framer project.
* Import the module into your project by requiring it like so: `ViewStack = require "viewstack"`

### Usage

**Setup**

Create the view stack, and then add a view to it using the `addView` method.

```coffeescript
stack = new ViewStack

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

-----

### To do
* Fix a bug in the fanned out touch events
* Add some error handling
* Add more event hooks
* Maybe just subclass Layer?
* Make things more customizable -- animation curves, card styling, dismiss button, stack offset, etc.
* Adjust the stacking offsets for different screen ratios (currently works best with iPhone 6 ratio)
