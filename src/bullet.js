import { global } from './global.js';
import { AngleToRadians } from './mathFs.js'
import { default as Entity } from './entity.js';
/** basic bullet **/
export default class Bullet extends Entity {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img);
    this.speed = speed;
    this.angle = AngleToRadians(angle);
    this.type = "bullet";
  };

  removeBulletScreend(ecene) {
    /** remove object screend **/
    if (this.x >= ecene.gameWidth + this.sizeHit) this.removeObject = true;
 
    if (this.x <= 0 - this.sizeHit) this.removeObject = true;

    if (this.y <= 0 - this.sizeHit) this.removeObject = true
    
    if (this.x >= ecene.gameHeight + this.sizeHit) this.removeObject = true;
 
  };

  update(deltaTime, ecene) {
    /** move bullet **/
    this.x += Math.cos(this.angle) * (this.speed * deltaTime);
    this.y += Math.sin(this.angle) * (this.speed * deltaTime);

    this.removeBulletScreend(ecene);
    //   console.log(deltaTime)
  };

};

export function SpawBullet(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new Bullet(x, y, size, sprite, speed, angle));
}
 
global.loggerScript('bullet')