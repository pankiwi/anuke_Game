/** basic bullet **/
class EntityMove extends Entity {
  constructor(x, y, size, rotation, img, SpriteSheet = { hasAnimation: false, width: 0, height: 0, frames: 0, SpeedFrame: 0 }, speed, vel = {x:0,y:0}) {
    super(x, y, size, rotation, img, SpriteSheet);
    this.speed = speed;
    this.vel = vel;
  };
  move(deltaTime){
    this.x += (this.vel.x * this.speed) * deltaTime;
    this.y += (this.vel.y * this.speed) * deltaTime;
  };
  update(deltaTime,ecene){
    this.move(deltaTime);
    
    super.update(deltaTime,ecene)
  }
};

function SpawEntityMove(x, y, size, rotation, img, SpriteSheet = { hasAnimation: false, width: 0, height: 0, frames: 0, SpeedFrame: 0 }, speed){
  global.addObjectGame( new EntityMove( x, y, size, rotation, img, SpriteSheet, speed, {x: Math.cos(rotation), y: Math.sin(rotation)}))
}