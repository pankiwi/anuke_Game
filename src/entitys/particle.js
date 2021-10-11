class Particle extends EntityMove {
  constructor(args = { size: 20, img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0, bucle: false }, speed: 0, gravity: { y: 0, x: 0 }, hasAlfa: false, lifeTime: 10 }) {
    super(args);
    this.gravity = args.gravity;
    this.hasAlfa = args.hasAlfa;
    this.lifeTime = args.lifeTime;
    this.drawLayer = 20;
    this.typeContent = Particle;
    this.type = "particle";

  };
  move(deltaTime) {
    this.x += ((this.vel.x * this.speed) + this.gravity.x) * deltaTime;
    this.y += ((this.vel.y * this.speed) + this.gravity.y) * deltaTime;
  };
  update(deltaTime, ecene) {
    if (this.lifeTime <= 0) {
      if (!this.hasAlfa) {
        this.removeObject = true;
      } else {
        if (this.alfa <= 0.05) {
          this.removeObject = true;
        } else {
          this.alfa -= deltaTime;
        }
      }
    } else {
      this.lifeTime -= deltaTime;
    }


    super.update(deltaTime, ecene);
  };
}