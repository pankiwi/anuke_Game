function spawEnemyBasic(this_) {
  let x, y, angle, size;

  size = MathFs.randFloat(80, 150);

  let enemy = new Enemy({
    size: size,
    img: this_.sprites.junction,
    speed: MathFs.randFloat(100, 250),
    effectDestroy: size >= 100 ? effects.explotionEntity : effects.explotionEntitySmall
  });
  
  size = size * global.WindowRadius;
  
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - size : this_.gameWidth + size;
    y = Math.random() * this_.gameHeight;
  } else {
    y = Math.random() < 0.5 ? 0 - size : this_.gameHeight + size;
    x = Math.random() * this_.gameWidth;
  };

  angle = MathFs.getAngle(this_.gameWidth / 2, x, this_.gameHeight / 2, y);
  
}