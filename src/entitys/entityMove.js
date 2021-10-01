/** basic bullet **/
class EntityMove extends Entity {
  constructor(x, y, size, rotation, img, SpriteSheet = {hasAnimation:false,width:0,height:0,frames:0,SpeedFrame:0}, speed, vel = {x:0,y:0}) {
    super(x, y, size, rotation, img, spriteAnimation);
    this.speed = speed;
    this.vel = vel;
  };
  move(deltaTime){
        /** move  **/
    this.x += (this.vel.x * this.speed) * deltaTime;
    this.y += (this.vel.y * this.speed) * deltaTime;
  }
  update(deltaTime,ecene) {
    super.update(deltaTime,ecene);
    
    move(deltaTime);
  };
};

function SpawEntityMoveAngle(x = 0, y = 0, size, img, SpriteSheet = {hasAnimation:false,width:0,height:0,frames:0,SpeedFrame:0}, speed,angle) {
  global.addObjectGame(new EntityMove(x, y, size, img, spriteAnimation, speed, {x: Math.cos(angle),y: Math.sin(angle)}));
}
function SpawEntityMoveVel(x = 0, y = 0, size, img, SpriteSheet = {hasAnimation:false,width:0,height:0,frames:0,SpeedFrame:0}, speed, vel) {
  global.addObjectGame(new EntityMove(x, y, size, img, speed, vel));
}