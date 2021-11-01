/** basic bullet **/
class EntityMove extends Entity {
  constructor(args = { size: 20,trailEffect: new effect(), effectDestroy: new effect(), img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 }, speed: 0 }) {
    super(args);
    this.speed = args.speed;
    this.trailEffect = args.trailEffect;
    this.vel = { x: 0, y: 0 };
    this.typeContent = EntityMove;
  };
  setInit(x, y, rotation, vel) {
    super.setInit(x, y, rotation);
    this.vel = vel;
  }
  move(deltaTime) {
    this.x += (this.vel.x * this.speed) * deltaTime;
    this.y += (this.vel.y * this.speed) * deltaTime;
  };
  update(deltaTime, ecene) {
    this.move(deltaTime);
    //if(Math.random() > 0.5) this.trailEffect.at(this.x, this.y,0, this);
    super.update(deltaTime, ecene);
  };
  at(x, y, rotation, vel) {
    let rot = rotation * (Math.PI / 180);
    let clone = new this.typeContent(this.args);

    if (vel) {
      clone.setInit(x, y, rotation, vel);
    } else {
      clone.setInit(x, y, rotation, { x: Math.cos(rot), y: Math.sin(rot) });
    };
    let cloneObject = global.addObjectGame(clone);
    return cloneObject;
  }
};