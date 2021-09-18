// the code is the property of Frank Poth 03/10/2017


var Button, controller;

// basically a rectangle, but it's purpose here is to be a button:
Button = function(enable, x, y, width, height, color, txt = "", widthTxt = 20, txtColor = color, out = function() {}) {

 this.active = false;
 this.enable = enable
 this.color = color;
 this.height = height * radio_user;
 this.width = width * radio_user;
 this.x = x;
 this.y = y;
 this.txt = txt
 this.widthTxt = widthTxt * radio_user
 this.txtColor = txtColor
 this.out = out
}

Button.prototype = {

 // returns true if the specified point lies within the rectangle:
 containsPoint: function(x, y) {

  // if the point is outside of the rectangle return false:
  if (x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.width) {

   return false;

  }

  return true;

 }

};

// handles everything to do with user input:
controller = {

 buttons: [],

 testButtons: function(target_touches) {

  var button, index0, index1, touch;

  // loop through all buttons:
  for (index0 = this.buttons.length - 1; index0 > -1; --index0) {

   button = this.buttons[index0];
   button.active = false;

   // loop through all touch objects:
   for (index1 = target_touches.length - 1; index1 > -1; --index1) {

    touch = target_touches[index1];

    // make sure the touch coordinates are adjusted for both the canvas offset and the scale ratio of the buffer and output canvases:
    if (button.containsPoint((touch.clientX - bounding_rectangle.left) * buffer_output_ratio, (touch.clientY - bounding_rectangle.top) * buffer_output_ratio) && button.enable) {

     button.active = true;
     if(button.out()){
      button.out();
     }
     
     
     break; // once the button is active, there's no need to check if any other points are inside, so continue

    }
    
   }

  }

 },

 touchEnd: function(event) {

  // event.preventDefault();
  controller.testButtons(event.targetTouches);

 },

 touchMove: function(event) {

  //    event.preventDefault();
  controller.testButtons(event.targetTouches);

 },

 touchStart: function(event) {

  // event.preventDefault()
  controller.testButtons(event.targetTouches);

 }


};

//drawScreen by me

var ScreenUI_, UIConfig_

ScreenUI_ = function(enable = false, Draw = function() {}) {
  this.draw = Draw
  this.enable = enable
}

UIConfig_ = {
  UIS: [],
  drawAllUI: function() {
    this.UIS.forEach((ui, index) => {
      if (ui.enable) {
        ui.draw()
      }
      
    })
  }
}

let animationScreenUI,animationScreenLoop, animatior
animationScreenUI = function(enable, timeSpeedUI, uis = []) {
  this.enable = enable
  this.timeSpeedUI = timeSpeedUI
  this.uis = uis
  this.finish = false
  this.i = 0
  this.time = 0
  this.drawUI = function() {
    this.time = ++this.time % this.timeSpeedUI + 1

    if (this.time >= this.timeSpeedUI) {
      this.time = 0
      if (UIConfig_.UIS[this.uis[this.i]]) {
        UIConfig_.UIS[this.uis[this.i]].enable = true
      }
      if (UIConfig_.UIS[this.uis[this.i - 1]]) {
        UIConfig_.UIS[this.uis[this.i - 1]].enable = false
      }
      this.i++
      if (this.i >= this.uis.length + 1) {
        this.finish = true
      }
    }

    if (this.finish) {
      this.uis.forEach((ui) => {
        UIConfig_.UIS[ui].enable = false
      })
      this.enable = false
    }

  }
}

animationScreenLoop = function(enable, timeSpeedUI, uis = []) {
  this.enable = enable
  this.timeSpeedUI = timeSpeedUI
  this.uis = uis
  this.i = 0
  this.time = 0
  this.drawUI = function() {
    this.time = ++this.time % this.timeSpeedUI + 1

    if (this.time >= this.timeSpeedUI) {
      this.time = 0
      if (UIConfig_.UIS[this.uis[this.i]]) {
        UIConfig_.UIS[this.uis[this.i]].enable = true
      }
      if (UIConfig_.UIS[this.uis[this.i - 1]]) {
        UIConfig_.UIS[this.uis[this.i - 1]].enable = false
      }
      this.i++
      if (this.i >= this.uis.length + 1) {
        if(UIConfig_.UIS[this.uis[this.i - 1]])UIConfig_.UIS[this.uis[this.i - 1]].enable = false
        this.i = 0
        
      }
    }

  }
}


animatior = {
  animations: [],
  drawAllAnimation: function() {
    this.animations.forEach((animation) => {
      if (animation.enable) {
        animation.drawUI()
      }
    })
  }
}
//futions
function drawButton(c, button) {
  c.beginPath()
  c.fillStyle = button.color;
  c.fillRect(button.x, button.y, button.width, button.height);
  c.fill()
  c.fillStyle = "black";
  c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
  c.fill()

  c.fillStyle = button.txtColor;
  c.textAlign = "center"
  c.font = "bold " + button.widthTxt + "px" + " bit";
  c.fillText(button.txt, button.x + button.width / 2, button.y + button.height / 2, button.widthTxt);

  if (button.active) {
    c.beginPath()
    c.fillStyle = "black";
    c.fillRect(button.x, button.y, button.width, button.height);
    c.fill()
    c.fillStyle = button.color;
    c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
    c.fill()

    c.fillStyle = "black";
    c.font = "bold " + button.widthTxt + "px bit";
    c.textAlign = "center"
    c.fillText(button.txt, button.x + button.width / 2, button.y + button.height / 2, button.widthTxt);

  }
}

function drawTxt(c, x, y, width, widthTxt, color, txt, pos, alfa) {
  c.save()
  c.fillStyle = color;
  c.font = (widthTxt * radio_user) + "px bit";
  c.globalAlpha = alfa
  c.textAlign = pos
  c.fillText(txt, x, y, (width * radio_user));
  c.restore()
}

function drawTxtChaceWidth(c, x, y, width, widthTxt, color, txt = "", pos, alfa) {
  c.save()
  c.fillStyle = color;
  c.font = (widthTxt * radio_user) + "px bit";
  c.globalAlpha = alfa
  c.textAlign = pos
  c.fillText(txt, x, y, width * radio_user *txt.length );
  c.restore()
}