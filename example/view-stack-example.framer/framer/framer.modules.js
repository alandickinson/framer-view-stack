require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"viewstack":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports.CardView = (function() {
  function CardView(opts) {
    var animationCurve, footer, header, hideBtnHeight, hideBtnWidth, j, layer, len, path, ref, view, viewBg;
    if (opts == null) {
      opts = {};
    }
    if (opts.contents == null) {
      opts.contents = [];
    }
    if (opts.arrowColor == null) {
      opts.arrowColor = "rgba(0,0,0,0.4)";
    }
    if (opts.title == null) {
      opts.title = null;
    }
    if (opts.tintColor == null) {
      opts.tintColor = "#000";
    }
    this.topInset = 80;
    this.bottomInset = 300;
    view = new Layer({
      frame: {
        x: 0,
        y: 0,
        width: Screen.width,
        height: Screen.height * 2
      }
    });
    viewBg = new Layer({
      backgroundColor: "#fff"
    });
    viewBg.style = {
      "border-radius": "20px 20px 0 0",
      "border": "2px solid rgba(0,0,0,0.2)"
    };
    viewBg.frame = {
      width: Screen.width,
      height: Screen.height + this.bottomInset
    };
    viewBg.parent = view;
    viewBg.name = "viewBg";
    this.viewCover = viewBg.copy();
    this.viewCover.name = "viewCover";
    this.viewCover.backgroundColor = "" + opts.tintColor;
    this.viewCover.parent = view;
    this.hideBtn = new Layer;
    hideBtnWidth = 90;
    hideBtnHeight = 29;
    header = "<svg class='hideBtn' x='0px' y='0px' width='" + hideBtnWidth + "' height='" + hideBtnHeight + "' viewBox='0 0 " + hideBtnWidth + " " + hideBtnHeight + "'>";
    path = '<path d="M45.047142,14.0108354 L9.76468939,0.476890323 C6.04890606,-0.948441643 1.88914944,0.929180624 0.473612939,4.67067704 C-0.941923567,8.41217345 0.922794917,12.6007154 4.63857824,14.0260474 L42.4369444,28.5250682 C44.0877822,29.1583106 45.9122178,29.1583106 47.5630556,28.5250682 L85.3614218,14.0260474 C89.0772051,12.6007154 90.9419236,8.41217345 89.5263871,4.67067704 C88.1108506,0.929180624 83.9510939,-0.948441643 80.2353106,0.476890323 L45.047142,14.0108354 Z"></path>';
    footer = "</svg>";
    this.hideBtn.html = header + path + footer;
    this.hideBtn.width = hideBtnWidth;
    this.hideBtn.height = hideBtnHeight;
    this.hideBtn.x = Align.center;
    this.hideBtn.y = 33;
    this.hideBtn.backgroundColor = null;
    this.hideBtn.style = {
      "fill": "" + opts.arrowColor
    };
    this.hideBtn.name = "hideBtn";
    this.hideBtn.parent = view;
    this.scroll = ScrollComponent.wrap(view);
    this.scroll.contentInset = {
      top: this.topInset,
      right: 0,
      bottom: -this.bottomInset,
      left: 0
    };
    this.scroll.content.y = this.topInset;
    this.scroll.content.style = {
      "border-radius": "20px 20px 0 0"
    };
    this.scroll.scrollHorizontal = false;
    this.scroll.topInset = this.topInset;
    this.scroll.content.on("change:children", (function(_this) {
      return function() {
        return Utils.delay(0.01, function() {
          _this.hideBtn.bringToFront();
          return _this.viewCover.bringToFront();
        });
      };
    })(this));
    if (typeof opts.contents === "object") {
      opts.contents = [opts.contents];
    }
    ref = opts.contents;
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      layer.parent = this.scroll.content;
    }
    if (opts.title !== null) {
      this.title = new Layer({
        width: Screen.width
      });
      this.title.html = opts.title;
      this.title.backgroundColor = '';
      this.title.style = {
        "fontFamily": "SanFranciscoDisplay-Bold",
        "fontSize": "80px",
        "color": "rgba(0,0,0,0.4)",
        "text-align": "center"
      };
      this.title.parent = this.scroll.content;
      this.title.x = 0;
      this.title.y = 140;
      this.title.name = "title";
    }
    this.scroll.originalFrame = this.scroll.frame;
    this.scroll.states.add({
      offscreen: {
        y: Screen.height,
        scale: 1,
        opacity: 1
      },
      frontPosition: {
        y: this.scroll.originalFrame.y,
        scale: 1,
        opacity: 1
      },
      backPosition: {
        y: this.scroll.originalFrame.y - 90,
        scale: 0.9,
        opacity: 1
      },
      fanned: {
        scale: 0.95,
        opacity: 1
      }
    });
    this.scroll.content.states.add({
      home: {
        y: 80
      }
    });
    this.viewCover.states.add({
      visible: {
        opacity: 0.5
      },
      hidden: {
        opacity: 0
      }
    });
    this.hideBtn.states.add({
      visible: {
        opacity: 1
      },
      hidden: {
        opacity: 0
      }
    });
    this.scroll.states.switchInstant("offscreen");
    this.viewCover.states.switchInstant("hidden");
    this.hideBtn.states.switchInstant("visible");
    animationCurve = {
      curve: "spring-dho(150,20,1,0)"
    };
    this.scroll.states.animationOptions = animationCurve;
    this.viewCover.states.animationOptions = animationCurve;
    this.hideBtn.states.animationOptions = animationCurve;
    this.scroll.on(Events.StateWillSwitch, (function(_this) {
      return function(from, to) {
        if (to === "backPosition") {
          _this.viewCover.states["switch"]("visible");
          _this.viewCover.ignoreEvents = false;
          _this.hideBtn.states["switch"]("hidden");
          if (_this.scroll.content.y < 80) {
            Utils.delay(0.05, function() {
              return _this.scroll.content.states["switch"]("home", {
                time: 0.2
              });
            });
          }
          _this.scroll.scroll = false;
        }
        if (to === "frontPosition") {
          _this.viewCover.states["switch"]("hidden");
          _this.viewCover.ignoreEvents = true;
          _this.hideBtn.states["switch"]("visible");
          _this.scroll.scrollVertical = true;
        }
        if (to === "fanned") {
          _this.viewCover.states["switch"]("hidden");
          _this.viewCover.ignoreEvents = false;
          _this.hideBtn.states.switchInstant("hidden");
          return _this.scroll.scroll = false;
        }
      };
    })(this));
  }

  CardView.prototype.getViewCover = function() {
    return this.viewCover;
  };

  CardView.prototype.getScrollView = function() {
    return this.scroll;
  };

  CardView.prototype.getHideBtn = function() {
    return this.hideBtn;
  };

  return CardView;

})();

exports.Manager = (function() {
  function Manager(opts) {
    if (opts == null) {
      opts = {};
    }
    this.dismissCurrentView = bind(this.dismissCurrentView, this);
    this.viewIncrement = 0;
    this.viewStack = [];
    if (opts.fanOut == null) {
      opts.fanOut = true;
    }
    if (opts.fanOut === true) {
      this.cardsShouldFanOut = true;
      this.fanOutHitTarget = new Layer({
        width: Screen.width,
        height: 80,
        backgroundColor: ''
      });
      this.fanOutHitTarget.visible = false;
      this.fanOutHitTarget.on(Events.TouchEnd, (function(_this) {
        return function() {
          _this.fanOutHitTarget.visible = false;
          return _this.fanOut();
        };
      })(this));
      this.targetPositioning = (function(_this) {
        return function() {
          var scrollY, yPos;
          if (_this.viewStack[0]) {
            scrollY = _this.viewStack[0].scroll.content.y;
            yPos = Utils.modulate(scrollY, [80, 0], [0, -80], true);
            return _this.fanOutHitTarget.y = yPos;
          }
        };
      })(this);
    } else {
      this.cardsShouldFanOut = false;
    }
  }

  Manager.prototype.addView = function(opts) {
    var view;
    if (opts == null) {
      opts = {};
    }
    if (opts.onDismiss == null) {
      opts.onDismiss = function() {
        return null;
      };
    }
    if (opts.onPresent == null) {
      opts.onPresent = function() {
        return null;
      };
    }
    if (opts.title == null) {
      opts.title = null;
    }
    if (opts.tintColor == null) {
      opts.tintColor = null;
    }
    view = new exports.CardView({
      contents: opts.contents,
      title: opts.title,
      tintColor: opts.tintColor
    });
    view.isInStack = false;
    view.hideBtn = view.getHideBtn();
    view.viewcover = view.getViewCover();
    view.scrollview = view.getScrollView();
    view.scrollview.name = "View_" + this.viewIncrement;
    this.viewIncrement++;
    view.onDismiss = opts.onDismiss;
    view.onPresent = opts.onPresent;
    view.hideBtn.on(Events.TouchEnd, (function(_this) {
      return function() {
        return _this.dismissCurrentView();
      };
    })(this));
    if (this.cardsShouldFanOut === true) {
      view.viewcover.on(Events.TouchEnd, (function(_this) {
        return function() {
          return _this.switchToView(view);
        };
      })(this));
    }
    this.addDragBehavior(view);
    return view;
  };

  Manager.prototype.presentView = function(view) {
    this.shiftBack();
    view.scroll.content.y = 80;
    view.scrollview.bringToFront();
    view.scrollview.states["switch"]("frontPosition");
    view.onPresent();
    if (view.isInStack === false) {
      this.viewStack.unshift(view);
      view.isInStack = true;
    }
    if (this.viewStack.length > 1 && this.cardsShouldFanOut === true) {
      this.fanOutHitTarget.visible = true;
      this.fanOutHitTarget.bringToFront();
      return this.viewStack[0].scroll.content.on("change:y", this.targetPositioning);
    }
  };

  Manager.prototype.dismissCurrentView = function() {
    if (this.viewStack[0]) {
      this.viewStack[0].scrollview.states["switch"]("offscreen");
      this.viewStack[0].isInStack = false;
      this.viewStack[0].onDismiss();
      if (this.fanOutHitTarget && this.fanOutHitTarget.visible === true) {
        this.viewStack[0].scroll.content.off("change:y", this.targetPositioning);
      }
      this.viewStack.shift();
      this.shiftForward();
      if (this.fanOutHitTarget && this.cardsShouldFanOut === true && this.viewStack.length < 2 && this.fanOutHitTarget.visible === true) {
        return this.fanOutHitTarget.visible = false;
      }
    }
  };

  Manager.prototype.dismissViews = function(views) {
    var j, len, view;
    for (j = 0, len = views.length; j < len; j++) {
      view = views[j];
      view.scrollview.states["switch"]("offscreen");
      view.isInStack = false;
      view.onDismiss();
      if (this.fanOutHitTarget && this.fanOutHitTarget.visible === true) {
        view.scroll.content.off("change:y", this.targetPositioning);
      }
      if (this.fanOutHitTarget && this.cardsShouldFanOut === true && this.viewStack.length < 2 && this.fanOutHitTarget.visible === true) {
        this.fanOutHitTarget.visible = false;
      }
      this.viewStack = _.reject(this.viewStack, function(viewitem) {
        return viewitem.scroll.index === view.scroll.index;
      });
    }
    return this.shiftForward();
  };

  Manager.prototype.switchToView = function(view) {
    var fanCurve, j, k, l, layer, len, len1, len2, ref, ref1, thisIndex, viewToFront, viewsToBackPosition, viewsToDismiss;
    fanCurve = "spring(300,25,0)";
    thisIndex = view.scroll.index;
    viewsToDismiss = [];
    viewsToBackPosition = [];
    viewToFront = null;
    ref = this.viewStack;
    for (j = 0, len = ref.length; j < len; j++) {
      layer = ref[j];
      if (layer.scroll.index > thisIndex) {
        viewsToDismiss.push(layer);
      }
      if (layer.scroll.index < thisIndex) {
        viewsToBackPosition.push(layer);
      }
      if (layer.scroll.index === thisIndex) {
        viewToFront = layer.scroll;
      }
    }
    this.dismissViews(viewsToDismiss);
    for (k = 0, len1 = viewsToBackPosition.length; k < len1; k++) {
      layer = viewsToBackPosition[k];
      layer.scroll.states["switch"]("backPosition", {
        curve: fanCurve
      });
    }
    viewToFront.states["switch"]("frontPosition", {
      curve: fanCurve
    });
    ref1 = this.viewStack;
    for (l = 0, len2 = ref1.length; l < len2; l++) {
      view = ref1[l];
      view.scroll.content.animate({
        properties: {
          y: view.scroll.topInset
        },
        curve: fanCurve
      });
    }
    if (this.viewStack.length > 1 && this.cardsShouldFanOut === true && this.fanOutHitTarget.visible === false) {
      this.fanOutHitTarget.visible = true;
      this.fanOutHitTarget.bringToFront();
      return this.viewStack[0].scroll.content.on("change:y", this.targetPositioning);
    }
  };

  Manager.prototype.shiftForward = function() {
    if (this.viewStack[0]) {
      return this.viewStack[0].scrollview.states["switch"]("frontPosition");
    }
  };

  Manager.prototype.shiftBack = function() {
    var j, len, ref, results, view;
    ref = this.viewStack;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      view = ref[j];
      if (view.scrollview.states.current.name !== "backPosition") {
        results.push(view.scrollview.states["switch"]("backPosition"));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Manager.prototype.getCardsBelow = function() {
    return _.rest(this.viewStack);
  };

  Manager.prototype.addDragBehavior = function(view) {
    view.scrollview.content.on("change:y", function() {
      var yOffset;
      yOffset = view.scrollview.content.y;
      return view.hideBtn.y = Utils.modulate(yOffset, [0, -10000], [33, 10033], true);
    });
    return view.scrollview.content.draggable.on(Events.DragEnd, (function(_this) {
      return function() {
        var yOffset;
        yOffset = view.scrollview.content.y;
        if (yOffset > 150) {
          return _this.dismissCurrentView();
        }
      };
    })(this));
  };

  Manager.prototype.fanOut = function() {
    var fan, fanCurve, i, j, k, len, len1, offset, ref, results, view;
    i = 1;
    offset = 155;
    fanCurve = "spring(300,25,0)";
    if (this.viewStack.length > 1 && this.cardsShouldFanOut === true) {
      ref = this.viewStack;
      for (j = 0, len = ref.length; j < len; j++) {
        view = ref[j];
        view.scroll.states["switch"]("fanned", {
          curve: fanCurve
        });
        view.scroll.content.animate({
          properties: {
            y: 0
          },
          curve: fanCurve
        });
        view.scroll.animate({
          properties: {
            y: 0
          },
          curve: fanCurve
        });
      }
      fan = _.initial(this.viewStack).reverse();
      results = [];
      for (k = 0, len1 = fan.length; k < len1; k++) {
        view = fan[k];
        view.scroll.animate({
          properties: {
            y: i * offset
          },
          curve: fanCurve
        });
        results.push(i++);
      }
      return results;
    }
  };

  return Manager;

})();


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uL21vZHVsZXMvdmlld3N0YWNrLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgZXhwb3J0cy5DYXJkVmlld1xuXHRjb25zdHJ1Y3RvcjogKG9wdHM9e30pIC0+XG5cdFx0IyBvcHRpb25zXG5cdFx0b3B0cy5jb250ZW50cyA/PSBbXVxuXHRcdG9wdHMuYXJyb3dDb2xvciA/PSBcInJnYmEoMCwwLDAsMC40KVwiXG5cdFx0b3B0cy50aXRsZSA/PSBudWxsXG5cdFx0b3B0cy50aW50Q29sb3IgPz0gXCIjMDAwXCJcblx0XHRAdG9wSW5zZXQgPSA4MFxuXHRcdEBib3R0b21JbnNldCA9IDMwMFxuXG5cdFx0IyBjcmVhdGUgYmFzZSB2aWV3IGxheWVyXG5cdFx0dmlldyA9IG5ldyBMYXllclxuXHRcdFx0ZnJhbWU6IHt4OiAwLCB5OiAwLCB3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IFNjcmVlbi5oZWlnaHQqMn1cblxuXHRcdCMgY3JlYXRlIHZpZXcgYmFja2dyb3VuZFxuXHRcdHZpZXdCZyA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIlxuXHRcdHZpZXdCZy5zdHlsZSA9IHtcImJvcmRlci1yYWRpdXNcIjpcIjIwcHggMjBweCAwIDBcIixcImJvcmRlclwiOlwiMnB4IHNvbGlkIHJnYmEoMCwwLDAsMC4yKVwifVxuXHRcdHZpZXdCZy5mcmFtZSA9IHt3aWR0aDogU2NyZWVuLndpZHRoLCBoZWlnaHQ6IFNjcmVlbi5oZWlnaHQgKyBAYm90dG9tSW5zZXR9XG5cdFx0dmlld0JnLnBhcmVudCA9IHZpZXdcblx0XHR2aWV3QmcubmFtZSA9IFwidmlld0JnXCJcblxuXHRcdCMgY3JlYXRlIHZpZXcgY292ZXJcblx0XHRAdmlld0NvdmVyID0gdmlld0JnLmNvcHkoKVxuXHRcdEB2aWV3Q292ZXIubmFtZSA9IFwidmlld0NvdmVyXCJcblx0XHRAdmlld0NvdmVyLmJhY2tncm91bmRDb2xvciA9IFwiI3tvcHRzLnRpbnRDb2xvcn1cIlxuXHRcdEB2aWV3Q292ZXIucGFyZW50ID0gdmlld1xuXG5cdFx0IyBjcmVhdGUgaGlkZSBidXR0b24gKHN2ZyBlbGVtZW50KVxuXHRcdEBoaWRlQnRuID0gbmV3IExheWVyXG5cdFx0aGlkZUJ0bldpZHRoID0gOTBcblx0XHRoaWRlQnRuSGVpZ2h0ID0gMjlcblx0XHRoZWFkZXIgPSBcIjxzdmcgY2xhc3M9J2hpZGVCdG4nIHg9JzBweCcgeT0nMHB4JyB3aWR0aD0nI3toaWRlQnRuV2lkdGh9JyBoZWlnaHQ9JyN7aGlkZUJ0bkhlaWdodH0nIHZpZXdCb3g9JzAgMCAje2hpZGVCdG5XaWR0aH0gI3toaWRlQnRuSGVpZ2h0fSc+XCJcblx0XHRwYXRoID0gJzxwYXRoIGQ9XCJNNDUuMDQ3MTQyLDE0LjAxMDgzNTQgTDkuNzY0Njg5MzksMC40NzY4OTAzMjMgQzYuMDQ4OTA2MDYsLTAuOTQ4NDQxNjQzIDEuODg5MTQ5NDQsMC45MjkxODA2MjQgMC40NzM2MTI5MzksNC42NzA2NzcwNCBDLTAuOTQxOTIzNTY3LDguNDEyMTczNDUgMC45MjI3OTQ5MTcsMTIuNjAwNzE1NCA0LjYzODU3ODI0LDE0LjAyNjA0NzQgTDQyLjQzNjk0NDQsMjguNTI1MDY4MiBDNDQuMDg3NzgyMiwyOS4xNTgzMTA2IDQ1LjkxMjIxNzgsMjkuMTU4MzEwNiA0Ny41NjMwNTU2LDI4LjUyNTA2ODIgTDg1LjM2MTQyMTgsMTQuMDI2MDQ3NCBDODkuMDc3MjA1MSwxMi42MDA3MTU0IDkwLjk0MTkyMzYsOC40MTIxNzM0NSA4OS41MjYzODcxLDQuNjcwNjc3MDQgQzg4LjExMDg1MDYsMC45MjkxODA2MjQgODMuOTUxMDkzOSwtMC45NDg0NDE2NDMgODAuMjM1MzEwNiwwLjQ3Njg5MDMyMyBMNDUuMDQ3MTQyLDE0LjAxMDgzNTQgWlwiPjwvcGF0aD4nXG5cdFx0Zm9vdGVyID0gXCI8L3N2Zz5cIlxuXHRcdEBoaWRlQnRuLmh0bWwgPSBoZWFkZXIgKyBwYXRoICsgZm9vdGVyXG5cdFx0QGhpZGVCdG4ud2lkdGggPSBoaWRlQnRuV2lkdGhcblx0XHRAaGlkZUJ0bi5oZWlnaHQgPSBoaWRlQnRuSGVpZ2h0XG5cdFx0QGhpZGVCdG4ueCA9IEFsaWduLmNlbnRlclxuXHRcdEBoaWRlQnRuLnkgPSAzM1xuXHRcdEBoaWRlQnRuLmJhY2tncm91bmRDb2xvciA9IG51bGxcblx0XHRAaGlkZUJ0bi5zdHlsZSA9IHtcImZpbGxcIjpcIiN7b3B0cy5hcnJvd0NvbG9yfVwifVxuXHRcdEBoaWRlQnRuLm5hbWUgPSBcImhpZGVCdG5cIlxuXHRcdEBoaWRlQnRuLnBhcmVudCA9IHZpZXdcblxuXHRcdCMgY3JlYXRlIHNjcm9sbCBjb21wb25lbnRcblx0XHRAc2Nyb2xsID0gU2Nyb2xsQ29tcG9uZW50LndyYXAodmlldylcblx0XHRAc2Nyb2xsLmNvbnRlbnRJbnNldCA9IHt0b3A6IEB0b3BJbnNldCwgcmlnaHQ6IDAsIGJvdHRvbTogLUBib3R0b21JbnNldCwgbGVmdDogMH1cblx0XHRAc2Nyb2xsLmNvbnRlbnQueSA9IEB0b3BJbnNldFxuXHRcdEBzY3JvbGwuY29udGVudC5zdHlsZSA9IHtcImJvcmRlci1yYWRpdXNcIjpcIjIwcHggMjBweCAwIDBcIn1cblx0XHRAc2Nyb2xsLnNjcm9sbEhvcml6b250YWwgPSBmYWxzZVxuXHRcdEBzY3JvbGwudG9wSW5zZXQgPSBAdG9wSW5zZXRcblxuXHRcdCMgbWFrZSBzdXJlIHRoZSB2aWV3Y292ZXIgYW5kIGhpZGVidG4gc3RheSBvbiB0b3Agb2Ygb3RoZXIgbGF5ZXJzXG5cdFx0QHNjcm9sbC5jb250ZW50Lm9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsID0+XG5cdFx0XHRVdGlscy5kZWxheSAwLjAxLCA9PlxuXHRcdFx0XHRAaGlkZUJ0bi5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRAdmlld0NvdmVyLmJyaW5nVG9Gcm9udCgpXG5cblx0XHQjIGFkZCBjb250ZW50c1xuXHRcdGlmIHR5cGVvZiBvcHRzLmNvbnRlbnRzID09IFwib2JqZWN0XCJcblx0XHRcdG9wdHMuY29udGVudHMgPSBbb3B0cy5jb250ZW50c11cblx0XHRmb3IgbGF5ZXIgaW4gb3B0cy5jb250ZW50c1xuXHRcdFx0bGF5ZXIucGFyZW50ID0gQHNjcm9sbC5jb250ZW50XG5cblx0XHQjIGFkZCB0aXRsZVxuXHRcdGlmIG9wdHMudGl0bGUgaXNudCBudWxsXG5cdFx0XHRAdGl0bGUgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0QHRpdGxlLmh0bWwgPSBvcHRzLnRpdGxlXG5cdFx0XHRAdGl0bGUuYmFja2dyb3VuZENvbG9yID0gJydcblx0XHRcdEB0aXRsZS5zdHlsZSA9IHtcblx0XHRcdFx0XCJmb250RmFtaWx5XCI6XCJTYW5GcmFuY2lzY29EaXNwbGF5LUJvbGRcIixcblx0XHRcdFx0XCJmb250U2l6ZVwiOlwiODBweFwiLFxuXHRcdFx0XHRcImNvbG9yXCI6XCJyZ2JhKDAsMCwwLDAuNClcIixcblx0XHRcdFx0XCJ0ZXh0LWFsaWduXCI6XCJjZW50ZXJcIlxuXHRcdFx0fVxuXHRcdFx0QHRpdGxlLnBhcmVudCA9IEBzY3JvbGwuY29udGVudFxuXHRcdFx0QHRpdGxlLnggPSAwXG5cdFx0XHRAdGl0bGUueSA9IDE0MFxuXHRcdFx0QHRpdGxlLm5hbWUgPSBcInRpdGxlXCJcblxuXHRcdCMgc2V0dXAgbGF5ZXIgc3RhdGVzXG5cdFx0QHNjcm9sbC5vcmlnaW5hbEZyYW1lID0gQHNjcm9sbC5mcmFtZVxuXG5cdFx0QHNjcm9sbC5zdGF0ZXMuYWRkXG5cdFx0XHRvZmZzY3JlZW46IHt5OiBTY3JlZW4uaGVpZ2h0LCBzY2FsZTogMSwgb3BhY2l0eTogMX1cblx0XHRcdGZyb250UG9zaXRpb246IHt5OiBAc2Nyb2xsLm9yaWdpbmFsRnJhbWUueSwgc2NhbGU6IDEsIG9wYWNpdHk6IDF9XG5cdFx0XHRiYWNrUG9zaXRpb246IHt5OiBAc2Nyb2xsLm9yaWdpbmFsRnJhbWUueS05MCwgc2NhbGU6IDAuOSwgb3BhY2l0eTogMX1cblx0XHRcdGZhbm5lZDoge3NjYWxlOiAwLjk1LCBvcGFjaXR5OiAxfVxuXHRcdEBzY3JvbGwuY29udGVudC5zdGF0ZXMuYWRkXG5cdFx0XHRob21lOiB7eTogODB9XG5cdFx0QHZpZXdDb3Zlci5zdGF0ZXMuYWRkXG5cdFx0XHR2aXNpYmxlOiB7b3BhY2l0eTogMC41fVxuXHRcdFx0aGlkZGVuOiB7b3BhY2l0eTogMH1cblx0XHRAaGlkZUJ0bi5zdGF0ZXMuYWRkXG5cdFx0XHR2aXNpYmxlOiB7b3BhY2l0eTogMX1cblx0XHRcdGhpZGRlbjoge29wYWNpdHk6IDB9XG5cblx0XHRAc2Nyb2xsLnN0YXRlcy5zd2l0Y2hJbnN0YW50IFwib2Zmc2NyZWVuXCJcblx0XHRAdmlld0NvdmVyLnN0YXRlcy5zd2l0Y2hJbnN0YW50IFwiaGlkZGVuXCJcblx0XHRAaGlkZUJ0bi5zdGF0ZXMuc3dpdGNoSW5zdGFudCBcInZpc2libGVcIlxuXG5cdFx0YW5pbWF0aW9uQ3VydmUgPSB7Y3VydmU6XCJzcHJpbmctZGhvKDE1MCwyMCwxLDApXCJ9XG5cdFx0QHNjcm9sbC5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9IGFuaW1hdGlvbkN1cnZlXG5cdFx0QHZpZXdDb3Zlci5zdGF0ZXMuYW5pbWF0aW9uT3B0aW9ucyA9IGFuaW1hdGlvbkN1cnZlXG5cdFx0QGhpZGVCdG4uc3RhdGVzLmFuaW1hdGlvbk9wdGlvbnMgPSBhbmltYXRpb25DdXJ2ZVxuXG5cdFx0IyB0b2dnbGUgc3RhdGVzIG9mIGxheWVycyBiYXNlZCBvbiB0aGUgc2Nyb2xsdmlldydzIHN0YXRlXG5cdFx0QHNjcm9sbC5vbiBFdmVudHMuU3RhdGVXaWxsU3dpdGNoLCAoZnJvbSwgdG8pID0+XG5cdFx0XHRpZiB0byBpcyBcImJhY2tQb3NpdGlvblwiXG5cdFx0XHRcdEB2aWV3Q292ZXIuc3RhdGVzLnN3aXRjaCBcInZpc2libGVcIlxuXHRcdFx0XHRAdmlld0NvdmVyLmlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cdFx0XHRcdEBoaWRlQnRuLnN0YXRlcy5zd2l0Y2ggXCJoaWRkZW5cIlxuXHRcdFx0XHRpZiBAc2Nyb2xsLmNvbnRlbnQueSA8IDgwXG5cdFx0XHRcdFx0VXRpbHMuZGVsYXkgMC4wNSwgPT5cblx0XHRcdFx0XHRcdEBzY3JvbGwuY29udGVudC5zdGF0ZXMuc3dpdGNoIFwiaG9tZVwiLCB7dGltZTogMC4yfVxuXHRcdFx0XHRAc2Nyb2xsLnNjcm9sbCA9IGZhbHNlXG5cdFx0XHRpZiB0byBpcyBcImZyb250UG9zaXRpb25cIlxuXHRcdFx0XHRAdmlld0NvdmVyLnN0YXRlcy5zd2l0Y2ggXCJoaWRkZW5cIlxuXHRcdFx0XHRAdmlld0NvdmVyLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcdFx0QGhpZGVCdG4uc3RhdGVzLnN3aXRjaCBcInZpc2libGVcIlxuXHRcdFx0XHRAc2Nyb2xsLnNjcm9sbFZlcnRpY2FsID0gdHJ1ZVxuXHRcdFx0aWYgdG8gaXMgXCJmYW5uZWRcIlxuXHRcdFx0XHRAdmlld0NvdmVyLnN0YXRlcy5zd2l0Y2ggXCJoaWRkZW5cIlxuXHRcdFx0XHRAdmlld0NvdmVyLmlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cdFx0XHRcdEBoaWRlQnRuLnN0YXRlcy5zd2l0Y2hJbnN0YW50IFwiaGlkZGVuXCJcblx0XHRcdFx0QHNjcm9sbC5zY3JvbGwgPSBmYWxzZVxuXHQjIGhlbHBlcnMgZm9yIE1hbmFnZXJcblx0Z2V0Vmlld0NvdmVyOiAtPiByZXR1cm4gQHZpZXdDb3ZlclxuXHRnZXRTY3JvbGxWaWV3OiAtPiByZXR1cm4gQHNjcm9sbFxuXHRnZXRIaWRlQnRuOiAtPiByZXR1cm4gQGhpZGVCdG5cblxuXG5cbmNsYXNzIGV4cG9ydHMuTWFuYWdlclxuXHRjb25zdHJ1Y3RvcjogKG9wdHM9e30pIC0+XG5cdFx0QHZpZXdJbmNyZW1lbnQgPSAwXG5cdFx0QHZpZXdTdGFjayA9IFtdXG5cdFx0b3B0cy5mYW5PdXQgPz0gdHJ1ZVxuXHRcdGlmIG9wdHMuZmFuT3V0ID09IHRydWVcblx0XHRcdCMgaW5pdCBmYW5vdXQgc3R1ZmZcblx0XHRcdEBjYXJkc1Nob3VsZEZhbk91dCA9IHRydWVcblx0XHRcdEBmYW5PdXRIaXRUYXJnZXQgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IFNjcmVlbi53aWR0aFxuXHRcdFx0XHRoZWlnaHQ6IDgwXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogJydcblx0XHRcdEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9IGZhbHNlXG5cdFx0XHRAZmFuT3V0SGl0VGFyZ2V0Lm9uIEV2ZW50cy5Ub3VjaEVuZCwgPT5cblx0XHRcdFx0QGZhbk91dEhpdFRhcmdldC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdFx0QGZhbk91dCgpXG5cdFx0XHRAdGFyZ2V0UG9zaXRpb25pbmcgPSA9PlxuXHRcdFx0XHRpZiBAdmlld1N0YWNrWzBdXG5cdFx0XHRcdFx0c2Nyb2xsWSA9IEB2aWV3U3RhY2tbMF0uc2Nyb2xsLmNvbnRlbnQueVxuXHRcdFx0XHRcdHlQb3MgPSBVdGlscy5tb2R1bGF0ZShzY3JvbGxZLCBbODAsIDBdLCBbMCwgLTgwXSwgdHJ1ZSlcblx0XHRcdFx0XHRAZmFuT3V0SGl0VGFyZ2V0LnkgPSB5UG9zXG5cdFx0ZWxzZVxuXHRcdFx0QGNhcmRzU2hvdWxkRmFuT3V0ID0gZmFsc2Vcblx0YWRkVmlldzogKG9wdHM9e30pIC0+XG5cdFx0IyBvcHRpb25zXG5cdFx0b3B0cy5vbkRpc21pc3MgPz0gLT4gbnVsbFxuXHRcdG9wdHMub25QcmVzZW50ID89IC0+IG51bGxcblx0XHRvcHRzLnRpdGxlID89IG51bGxcblx0XHRvcHRzLnRpbnRDb2xvciA/PSBudWxsXG5cblx0XHQjIGNyZWF0ZSB2aWV3XG5cdFx0dmlldyA9IG5ldyBleHBvcnRzLkNhcmRWaWV3XG5cdFx0XHRjb250ZW50czogb3B0cy5jb250ZW50c1xuXHRcdFx0dGl0bGU6IG9wdHMudGl0bGVcblx0XHRcdHRpbnRDb2xvcjogb3B0cy50aW50Q29sb3Jcblx0XHR2aWV3LmlzSW5TdGFjayA9IGZhbHNlXG5cblx0XHQjIGdldCByZWZlcmVuY2VzIHRvIGxheWVycyBpbiB0aGUgdmlldyBhbmQgbmFtZSB0aGUgc2Nyb2xsdmlld1xuXHRcdHZpZXcuaGlkZUJ0biA9IHZpZXcuZ2V0SGlkZUJ0bigpXG5cdFx0dmlldy52aWV3Y292ZXIgPSB2aWV3LmdldFZpZXdDb3ZlcigpXG5cdFx0dmlldy5zY3JvbGx2aWV3ID0gdmlldy5nZXRTY3JvbGxWaWV3KClcblx0XHR2aWV3LnNjcm9sbHZpZXcubmFtZSA9IFwiVmlld18je0B2aWV3SW5jcmVtZW50fVwiXG5cdFx0QHZpZXdJbmNyZW1lbnQrK1xuXG5cdFx0dmlldy5vbkRpc21pc3MgPSBvcHRzLm9uRGlzbWlzc1xuXHRcdHZpZXcub25QcmVzZW50ID0gb3B0cy5vblByZXNlbnRcblxuXHRcdCMgc2V0IHVwIGJlaGF2aW9yc1xuXHRcdHZpZXcuaGlkZUJ0bi5vbiBFdmVudHMuVG91Y2hFbmQsID0+XG5cdFx0XHRAZGlzbWlzc0N1cnJlbnRWaWV3KClcblx0XHRpZiBAY2FyZHNTaG91bGRGYW5PdXQgPT0gdHJ1ZVxuXHRcdFx0dmlldy52aWV3Y292ZXIub24gRXZlbnRzLlRvdWNoRW5kLCA9PlxuXHRcdFx0XHRAc3dpdGNoVG9WaWV3KHZpZXcpXG5cblx0XHQjIGFmZml4IGNsb3NlIGJ1dHRvbiwgYW5kIG1ha2Ugdmlld3MgZGlzbWlzc2FibGUgYnkgc3dpcGluZ1xuXHRcdEBhZGREcmFnQmVoYXZpb3Iodmlldylcblx0XHRyZXR1cm4gdmlld1xuXG5cdHByZXNlbnRWaWV3OiAodmlldykgLT5cblx0XHRAc2hpZnRCYWNrKClcblx0XHR2aWV3LnNjcm9sbC5jb250ZW50LnkgPSA4MFxuXHRcdHZpZXcuc2Nyb2xsdmlldy5icmluZ1RvRnJvbnQoKVxuXHRcdHZpZXcuc2Nyb2xsdmlldy5zdGF0ZXMuc3dpdGNoKFwiZnJvbnRQb3NpdGlvblwiKVxuXHRcdHZpZXcub25QcmVzZW50KClcblx0XHRpZiB2aWV3LmlzSW5TdGFjayBpcyBmYWxzZVxuXHRcdFx0QHZpZXdTdGFjay51bnNoaWZ0KHZpZXcpXG5cdFx0XHR2aWV3LmlzSW5TdGFjayA9IHRydWVcblx0XHRpZiBAdmlld1N0YWNrLmxlbmd0aCA+IDEgJiYgQGNhcmRzU2hvdWxkRmFuT3V0ID09IHRydWVcblx0XHRcdEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9IHRydWVcblx0XHRcdEBmYW5PdXRIaXRUYXJnZXQuYnJpbmdUb0Zyb250KClcblx0XHRcdEB2aWV3U3RhY2tbMF0uc2Nyb2xsLmNvbnRlbnQub24oXCJjaGFuZ2U6eVwiLCBAdGFyZ2V0UG9zaXRpb25pbmcpXG5cdGRpc21pc3NDdXJyZW50VmlldzogPT5cblx0XHRpZiBAdmlld1N0YWNrWzBdXG5cdFx0XHRAdmlld1N0YWNrWzBdLnNjcm9sbHZpZXcuc3RhdGVzLnN3aXRjaCBcIm9mZnNjcmVlblwiXG5cdFx0XHRAdmlld1N0YWNrWzBdLmlzSW5TdGFjayA9IGZhbHNlXG5cdFx0XHRAdmlld1N0YWNrWzBdLm9uRGlzbWlzcygpXG5cdFx0XHRpZiBAZmFuT3V0SGl0VGFyZ2V0ICYmIEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9PSB0cnVlXG5cdFx0XHRcdEB2aWV3U3RhY2tbMF0uc2Nyb2xsLmNvbnRlbnQub2ZmKFwiY2hhbmdlOnlcIiwgQHRhcmdldFBvc2l0aW9uaW5nKVxuXHRcdFx0QHZpZXdTdGFjay5zaGlmdCgpXG5cdFx0XHRAc2hpZnRGb3J3YXJkKClcblx0XHRcdGlmIEBmYW5PdXRIaXRUYXJnZXQgJiYgQGNhcmRzU2hvdWxkRmFuT3V0ID09IHRydWUgJiYgQHZpZXdTdGFjay5sZW5ndGggPCAyICYmIEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9PSB0cnVlXG5cdFx0XHRcdEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9IGZhbHNlXG5cdGRpc21pc3NWaWV3czogKHZpZXdzKSAtPlxuXHRcdGZvciB2aWV3IGluIHZpZXdzXG5cdFx0XHR2aWV3LnNjcm9sbHZpZXcuc3RhdGVzLnN3aXRjaCBcIm9mZnNjcmVlblwiXG5cdFx0XHR2aWV3LmlzSW5TdGFjayA9IGZhbHNlXG5cdFx0XHR2aWV3Lm9uRGlzbWlzcygpXG5cdFx0XHRpZiBAZmFuT3V0SGl0VGFyZ2V0ICYmIEBmYW5PdXRIaXRUYXJnZXQudmlzaWJsZSA9PSB0cnVlXG5cdFx0XHRcdHZpZXcuc2Nyb2xsLmNvbnRlbnQub2ZmKFwiY2hhbmdlOnlcIiwgQHRhcmdldFBvc2l0aW9uaW5nKVxuXHRcdFx0aWYgQGZhbk91dEhpdFRhcmdldCAmJiBAY2FyZHNTaG91bGRGYW5PdXQgPT0gdHJ1ZSAmJiBAdmlld1N0YWNrLmxlbmd0aCA8IDIgJiYgQGZhbk91dEhpdFRhcmdldC52aXNpYmxlID09IHRydWVcblx0XHRcdFx0QGZhbk91dEhpdFRhcmdldC52aXNpYmxlID0gZmFsc2Vcblx0XHRcdEB2aWV3U3RhY2sgPSBfLnJlamVjdCBAdmlld1N0YWNrLCAodmlld2l0ZW0pIC0+XG5cdFx0XHRcdHZpZXdpdGVtLnNjcm9sbC5pbmRleCA9PSB2aWV3LnNjcm9sbC5pbmRleFxuXHRcdEBzaGlmdEZvcndhcmQoKVxuXHRzd2l0Y2hUb1ZpZXc6ICh2aWV3KSAtPlxuXHRcdGZhbkN1cnZlID0gXCJzcHJpbmcoMzAwLDI1LDApXCJcblx0XHR0aGlzSW5kZXggPSB2aWV3LnNjcm9sbC5pbmRleFxuXHRcdHZpZXdzVG9EaXNtaXNzID0gW11cblx0XHR2aWV3c1RvQmFja1Bvc2l0aW9uID0gW11cblx0XHR2aWV3VG9Gcm9udCA9IG51bGxcblx0XHRmb3IgbGF5ZXIgaW4gQHZpZXdTdGFja1xuXHRcdFx0aWYgbGF5ZXIuc2Nyb2xsLmluZGV4ID4gdGhpc0luZGV4XG5cdFx0XHRcdHZpZXdzVG9EaXNtaXNzLnB1c2gobGF5ZXIpXG5cdFx0XHRpZiBsYXllci5zY3JvbGwuaW5kZXggPCB0aGlzSW5kZXhcblx0XHRcdFx0dmlld3NUb0JhY2tQb3NpdGlvbi5wdXNoKGxheWVyKVxuXHRcdFx0aWYgbGF5ZXIuc2Nyb2xsLmluZGV4ID09IHRoaXNJbmRleFxuXHRcdFx0XHR2aWV3VG9Gcm9udCA9IGxheWVyLnNjcm9sbFxuXHRcdEBkaXNtaXNzVmlld3Modmlld3NUb0Rpc21pc3MpXG5cdFx0Zm9yIGxheWVyIGluIHZpZXdzVG9CYWNrUG9zaXRpb25cblx0XHRcdGxheWVyLnNjcm9sbC5zdGF0ZXMuc3dpdGNoIFwiYmFja1Bvc2l0aW9uXCIsIHtjdXJ2ZTogZmFuQ3VydmV9XG5cdFx0dmlld1RvRnJvbnQuc3RhdGVzLnN3aXRjaCBcImZyb250UG9zaXRpb25cIiwge2N1cnZlOiBmYW5DdXJ2ZX1cblx0XHRmb3IgdmlldyBpbiBAdmlld1N0YWNrXG5cdFx0XHR2aWV3LnNjcm9sbC5jb250ZW50LmFuaW1hdGVcblx0XHRcdFx0cHJvcGVydGllczpcblx0XHRcdFx0XHR5OiB2aWV3LnNjcm9sbC50b3BJbnNldFxuXHRcdFx0XHRjdXJ2ZTogZmFuQ3VydmVcblx0XHRpZiBAdmlld1N0YWNrLmxlbmd0aCA+IDEgJiYgQGNhcmRzU2hvdWxkRmFuT3V0ID09IHRydWUgJiYgQGZhbk91dEhpdFRhcmdldC52aXNpYmxlID09IGZhbHNlXG5cdFx0XHRAZmFuT3V0SGl0VGFyZ2V0LnZpc2libGUgPSB0cnVlXG5cdFx0XHRAZmFuT3V0SGl0VGFyZ2V0LmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRAdmlld1N0YWNrWzBdLnNjcm9sbC5jb250ZW50Lm9uKFwiY2hhbmdlOnlcIiwgQHRhcmdldFBvc2l0aW9uaW5nKVxuXHRzaGlmdEZvcndhcmQ6IC0+XG5cdFx0aWYgQHZpZXdTdGFja1swXVxuXHRcdFx0QHZpZXdTdGFja1swXS5zY3JvbGx2aWV3LnN0YXRlcy5zd2l0Y2ggXCJmcm9udFBvc2l0aW9uXCJcblx0c2hpZnRCYWNrOiAtPlxuXHRcdGZvciB2aWV3IGluIEB2aWV3U3RhY2tcblx0XHRcdGlmIHZpZXcuc2Nyb2xsdmlldy5zdGF0ZXMuY3VycmVudC5uYW1lIGlzbnQgXCJiYWNrUG9zaXRpb25cIlxuXHRcdFx0XHR2aWV3LnNjcm9sbHZpZXcuc3RhdGVzLnN3aXRjaCBcImJhY2tQb3NpdGlvblwiXG5cdGdldENhcmRzQmVsb3c6IC0+XG5cdFx0cmV0dXJuIF8ucmVzdChAdmlld1N0YWNrKVxuXHRhZGREcmFnQmVoYXZpb3I6ICh2aWV3KSAtPlxuXHRcdHZpZXcuc2Nyb2xsdmlldy5jb250ZW50Lm9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHRcdHlPZmZzZXQgPSB2aWV3LnNjcm9sbHZpZXcuY29udGVudC55XG5cdFx0XHR2aWV3LmhpZGVCdG4ueSA9IFV0aWxzLm1vZHVsYXRlKHlPZmZzZXQsIFswLCAtMTAwMDBdLCBbMzMsIDEwMDMzXSwgdHJ1ZSlcblx0XHR2aWV3LnNjcm9sbHZpZXcuY29udGVudC5kcmFnZ2FibGUub24gRXZlbnRzLkRyYWdFbmQsID0+XG5cdFx0XHR5T2Zmc2V0ID0gdmlldy5zY3JvbGx2aWV3LmNvbnRlbnQueVxuXHRcdFx0aWYgeU9mZnNldCA+IDE1MFxuXHRcdFx0XHRAZGlzbWlzc0N1cnJlbnRWaWV3KClcblx0ZmFuT3V0OiAtPlxuXHRcdGkgPSAxXG5cdFx0b2Zmc2V0ID0gMTU1XG5cdFx0ZmFuQ3VydmUgPSBcInNwcmluZygzMDAsMjUsMClcIlxuXHRcdGlmIEB2aWV3U3RhY2subGVuZ3RoID4gMSAmJiBAY2FyZHNTaG91bGRGYW5PdXQgPT0gdHJ1ZVxuXHRcdFx0Zm9yIHZpZXcgaW4gQHZpZXdTdGFja1xuXHRcdFx0XHR2aWV3LnNjcm9sbC5zdGF0ZXMuc3dpdGNoIFwiZmFubmVkXCIsIHtjdXJ2ZTogZmFuQ3VydmV9XG5cdFx0XHRcdHZpZXcuc2Nyb2xsLmNvbnRlbnQuYW5pbWF0ZVxuXHRcdFx0XHRcdHByb3BlcnRpZXM6XG5cdFx0XHRcdFx0XHR5OiAwXG5cdFx0XHRcdFx0Y3VydmU6IGZhbkN1cnZlXG5cdFx0XHRcdHZpZXcuc2Nyb2xsLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eTogMFxuXHRcdFx0XHRcdGN1cnZlOiBmYW5DdXJ2ZVxuXHRcdFx0ZmFuID0gXy5pbml0aWFsKEB2aWV3U3RhY2spLnJldmVyc2UoKVxuXHRcdFx0Zm9yIHZpZXcgaW4gZmFuXG5cdFx0XHRcdHZpZXcuc2Nyb2xsLmFuaW1hdGVcblx0XHRcdFx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0XHRcdFx0eTogaSpvZmZzZXRcblx0XHRcdFx0XHRjdXJ2ZTogZmFuQ3VydmVcblx0XHRcdFx0aSsrXG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQTtBREFBLElBQUE7O0FBQU0sT0FBTyxDQUFDO0VBQ0Esa0JBQUMsSUFBRDtBQUVaLFFBQUE7O01BRmEsT0FBSzs7O01BRWxCLElBQUksQ0FBQyxXQUFZOzs7TUFDakIsSUFBSSxDQUFDLGFBQWM7OztNQUNuQixJQUFJLENBQUMsUUFBUzs7O01BQ2QsSUFBSSxDQUFDLFlBQWE7O0lBQ2xCLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsV0FBRCxHQUFlO0lBR2YsSUFBQSxHQUFXLElBQUEsS0FBQSxDQUNWO01BQUEsS0FBQSxFQUFPO1FBQUMsQ0FBQSxFQUFHLENBQUo7UUFB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
