class Enemy extends Entity{
  constructor(x, y, size, img, speed, angle){
    super(x, y, size, img);
    this.speed = speed;
    this.angle = MathFs.AngleToRadians(angle);
    
    this.type = 'enemy';
  };
  update(ecene) {
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

function SpawEnemy(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new Enemy(x, y, size, sprite, speed, angle));
}
