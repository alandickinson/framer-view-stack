# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Alan Dickinson"
	twitter: ""
	description: ""


bg = new Layer
	frame: Screen.frame
	backgroundColor: "rgba(255,255,255,1)"
bg.on Events.Tap, ->
	stack.presentView(view_one)

art = Framer.Importer.load("imported/nav-test@2x")
Utils.globalLayers(art)

artboards = [view1,view2,view3,view4]
for layer in artboards
	layer.visible = false

VVS = require "vertical-view-stack"
stack = new VVS.CardViewManager
	fanOut: false

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