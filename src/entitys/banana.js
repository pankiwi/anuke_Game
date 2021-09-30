class banana extends Entity {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img);
    this.speed = speed;
    this.angle = MathFs.AngleToRadians(angle);
    this.type = 'banana';
    
    this.animation =  new spriteAnimation(img,32,60,speed*2,13,size,size);
  };
  draw(ctx){
    this.animation.draw(ctx,this.x,this.y);
  };
  update(ecene) {
    this.animation.update();
    
    global.findObject('bullet').forEach((bullet) => {
      if (this.collicionObject(bullet)) {
        this.destroy();
        bullet.destroy();
      }
    })
    super.update(ecene);

    /** move bullet **/
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }
}


function SpawBanana(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new banana(x, y, size, sprite, speed, angle));
}
