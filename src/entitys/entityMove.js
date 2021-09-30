/** basic bullet **/
class EntityMove extends Entity {
  constructor(x, y, size, img, speed, vel = {x:0,y:0}) {
    super(x, y, size, img);
    this.speed = speed;
    this.vel = vel;
  };
  update(deltaTime,ecene) {
    super.update(ecene)


    /** move  **/
    this.x += (this.vel.x * this.speed) * deltaTime;
    this.y += (this.vel.y * this.speed) * deltaTime;

  };
};

function SpawEntityMove(x = 0, y = 0, size, sprite, speed, vel= {},angle) {
  global.addObjectGame(new EntityMove(x, y, size, sprite, speed, angle));
}