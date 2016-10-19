# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Alan Dickinson"
	twitter: ""
	description: ""


art = Framer.Importer.load("imported/view-stack-example@2x")
Utils.globalLayers(art)

bg = new Layer
	frame: Screen.frame
	backgroundColor: "rgba(255,255,255,1)"
Utils.labelLayer bg, "Tap to present views"
bg.style = {color: "grey", fontSize: "36px", fontFamily:"SanFranciscoDisplay-Medium"}
bg.on Events.Tap, ->
	stack.presentView(view_one)


artboards = [view1,view2,view3,view4]
for layer in artboards
	layer.visible = false

VVS = require "vertical-view-stack"
stack = new VVS.CardViewManager

view_one = stack.addView
	contents: one
	title: "One"
	tintColor: "#fff"
view_two = stack.addView
	contents: two
	title: "Two"
	tintColor: "#fff"
view_three = stack.addView
	contents: three
	title: "Three"
	tintColor: "#fff"
view_four = stack.addView
	contents: four
	title: "Four"
	tintColor: "#fff"
		
art.one.on Events.Tap, ->
	stack.presentView(view_two)
art.two.on Events.Tap, ->
	stack.presentView(view_three)
art.three.on Events.Tap, ->
	stack.presentView(view_four)