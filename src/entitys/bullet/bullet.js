/** basic bullet **/
class Bullet extends Entity {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img);
    this.speed = speed;
    this.angle = MathFs.AngleToRadians(angle);
    this.pierce = false
    this.type = "bullet";
  };
  update(ecene) {
    
    global.findObject('enemy').forEach((enemy) => {
      if (this.collicionObject(enemy)) {
        this.destroy();
        enemy.destroy();
      }
    })
    
    super.update(ecene)
    
    
    /** move bullet **/
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    
  };
  destroy(){
     if(!this.pierce) super.destroy();
  };
};

function SpawBullet(x = 0, y = 0, size, sprite, speed, angle) {
 global.addObjectGame(new Bullet(x, y, size, sprite, speed, angle));
}