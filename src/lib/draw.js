class spriteAnimation {
  i = 0;
  counter = 0;
  constructor(img, widthFrame, heightFrame, speedFrame, frames, size, bucle = true) {
    this.img = img;
    this.widthFrame = widthFrame;
    this.heightFrame = heightFrame;
    this.speedFrame = speedFrame;
    this.frames = frames;
    this.animationBucle = bucle;
    this.done = false;
  };
  draw(ctx = new CanvasRenderingContext2D, x, y, rotate, alfa, size) {
    Draw.DrawImageSheet(ctx, this.img, 0, this.i * this.heightFrame, this.widthFrame, this.heightFrame, x, y, alfa,size, rotate)
  };
  update(deltaTime) {
    this.counter += this.speedFrame * deltaTime;
    if (this.counter >= 10 && !this.done) {
      this.counter = 0;
      this.i++
      if (this.i === this.frames && !this.animationBucle) this.done = true;
      this.i %= this.frames;
      
    }
  };
  IsDone() {
    return this.done;
  }
}

let Draw = {
  DrawImage: function(ctx = new CanvasRenderingContext2D, img, x, y, alfa, size, rotate) {

    ctx.translate(x, y);
    ctx.rotate(Math.PI / 180 * (rotate + 90));
    ctx.translate(-x, -y);
    ctx.save();
    ctx.globalAlpha = alfa;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, x - size / 2, y - size / 2, size, size);
    ctx.restore();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

  },
  DrawImageSheet: function(ctx, img, imgX, imgY, width, heigth, x, y, alfa, size, rotate) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(Math.PI / 180 * (rotate + 90));
    ctx.translate(-x, -y);

    ctx.globalAlfa = alfa;

    ctx.drawImage(img, imgX, imgY, width, heigth, x - size / 2, y - size / 2, size, size);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
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

  DrawTxt: function(ctx = new CanvasRenderingContext2D, x, y, width, widthTxt, color, txt = "", pos = "center", fontStyle = "Arial", alfa = 1, stroke = false, strokeColor = 'black', strokeWidth = 10) {
    ctx.save();

    ctx.font = widthTxt + "px Arial";
    ctx.globalAlpha = alfa;
    ctx.textAlign = pos;

    if (stroke) {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(txt, x, y, width * txt.length);
    }
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y, width * txt.length);

    ctx.restore();
  },
  DrawLine(ctx = new CanvasRenderingContext2D, x1, y1, x2, y2, width, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}