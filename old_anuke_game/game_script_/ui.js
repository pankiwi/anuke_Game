//backgrpund
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  //0
}))
//gameMenu
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 5, c.canvas.height / 10, 400, 100, "black", "points:", "center", 1);
  drawTxt(c, c.canvas.width / 2.6, c.canvas.height / 10, 400, 100, "black", points, "left", 1);
}));
//1
//guidescreend
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 3, 1000, 300, "black", "Anuke Game", "center", 1);
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "V1.6", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "he is anuke", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 1200, 200, "black", "anuke is enemy juction team", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.8, 1200, 200, "black", "defend anuke with router shot", "center", 1);
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.3, 800, 140, "black", "(click screend for  shot router)", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.8, 1200, 200, "black", "on the map appear Power ups", "center", 1);
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.3, 800, 140, "black", "(shot power ups for active)", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "Start Game", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "5", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "4", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "3", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "2", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "1", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 600, 120, "black", "0", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 700, 150, "black", "anuke is dead", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () =>  {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 500, 150, "black", "juction team win", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.5, 400, 100, "black", "you lost", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2, 600, 150, "black", "(click for reset Game)", "center", 1);
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
}));
UIConfig_.UIS.push(new ScreenUI_(false, () => {
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2.8, 800, 200, "black", "End Game", "center", 1);
  drawTxt(c, c.canvas.width / 2.4, c.canvas.height / 2.4, 500, 120, "black", "points :", "center", 1);
  drawTxtChaceWidth(c, c.canvas.width / 1.7, c.canvas.height / 2.4, 500, 120, "black", "" + points + "", "left", 1);

}));

//animation

animatior.animations.push(new animationScreenUI(false, 200, [2, 3, 4, 5,6]))
animatior.animations.push(new animationScreenUI(false, 100, [7,8,9,10,11,12,13]))
animatior.animations.push(new animationScreenUI(false, 300, [14,15,16]))
animatior.animations.push(new animationScreenLoop(false, 50, [17,18]))