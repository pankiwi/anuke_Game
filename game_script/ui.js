//backgrpund
UIConfig_.UIS.push(new ScreenUI_(false, () => {
//0
}))
//gameMenu
UIConfig_.UIS.push(new ScreenUI_(false, () => {
 drawTxt(c, c.canvas.width / 5, c.canvas.height / 10, 400 , 100, "black", "points:", "center", 1)
 drawTxt(c, c.canvas.width / 3.2, c.canvas.height / 10, 400, 100, "black", points, "left", 1)
// drawTxt(c, c.canvas.width / 2, c.canvas.height / 10, 200, 50, "black", counterEnemy + " / " + 10 * dificulty, "center", 1)
}))
//1
//guidescreend

UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "he is anuke", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 800, 100, "black", "anuke is enemy juction team", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 800, 100, "black", "defend anuke with router shot", "center", 1)
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.2, 500, 100, "black", "(click screend for  shot router)", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "Star Game", "center", 1)
}))

UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "5", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "4", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "3", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "2", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "1", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "0", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 500, 150, "black", "anuke is dead", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 500, 150, "black", "juction team win", "center", 1)
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "you lost", "center", 1)
}))

UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.8, 800, 200, "black", "End Game", "center", 1)
  drawTxt(c, c.canvas.width / 2.4, c.canvas.height / 2.4, 500, 120, "black", "points :", "center", 1)
  drawTxtChaceWidth(c, c.canvas.width / 1.7, c.canvas.height / 2.4, 500, 120, "black", ""+points+"", "left", 1)
  
}))
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2, 600, 150, "black","(click for reset Game)", "center", 1)
}))

UIConfig_.UIS.push(new ScreenUI_(false, () => {
  
}))
//animation

animatior.animations.push(new animationScreenUI(false,200,[2,3,4]))
animatior.animations.push(new animationScreenUI(false,100,[5,6,7,8,9,10,11]))
animatior.animations.push(new animationScreenUI(false,300,[12,13,14]))
animatior.animations.push(new animationScreenLoop(false,50,[16,17]))