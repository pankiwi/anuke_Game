/** basic bullet **/
class Bullet extends Entity {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img);
    this.speed = speed;
    this.angle = MathFs.AngleToRadians(angle);
    this.type = "bullet";
  };

  removeBulletScreend(ecene) {
    /** remove object screend **/
    if (this.x >= ecene.gameWidth + this.sizeHit) this.removeObject = true;
 
    if (this.x <= 0 - this.sizeHit) this.removeObject = true;

    if (this.y <= 0 - this.sizeHit) this.removeObject = true
    
    if (this.x >= ecene.gameHeight + this.sizeHit) this.removeObject = true;
 
  };

  update(ecene) {
    /** move bullet **/
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    this.removeBulletScreend(ecene);
  };

};

function SpawBullet(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new Bullet(x, y, size, sprite, speed, angle));
}
