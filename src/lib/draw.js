/* load imgs */
export default class SpriteSheet {
  sprite = {};
  constructor(none) {};
  loadSprite(nameTarget, src) {
    this.sprite[nameTarget] = new Image();
    this.sprite[nameTarget].src = src;
  };
  findSprite(nameTarget) {
    return this.sprite[nameTarget];
  };
};

export let Draw = {
  DrawImage: function(ctx, img, x, y, alfa, size) {
  ctx.save();
  ctx.globalAlfa = alfa;
  ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x - size / 2, y - size / 2, size, size);
  ctx.restore();
},

 RenderCanvas: function(ctx, c) {
  ctx.drawImage(c.canvas, 0, 0, c.canvas.width, c.canvas.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
},

 DrawCircle: function(ctx = new CanvasRenderingContext2D, x, y, size, color) {
  ctx.beginPath()
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, Math.PI * 2, false);
  ctx.fill()
  ctx.closePath()
},

 DrawTxtChaceWidth: function(ctx, x, y, width, widthTxt, color, txt = "", pos = "center", alfa = 1) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = (widthTxt) + "px bit";
  ctx.globalAlpha = alfa;
  ctx.textAlign = pos;
  ctx.fillText(txt, x, y, width * txt.length);
  ctx.restore();
}
}