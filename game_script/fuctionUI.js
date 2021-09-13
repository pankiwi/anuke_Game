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

let animationScreenUI, animatior
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
  c.beginPath()
  c.fillStyle = color;
  c.font = widthTxt + "px bit";
  c.globalAlpha = alfa
  c.textAlign = pos
  c.fillText(txt, x, y, width);
}