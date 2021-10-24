class Particle extends EntityMove {
  constructor(args = {
    size: 20,
    img: new Image().src = "../assets/sprites/anuke.png",
    animation: { width: 0, height: 0, frames: 0, speedFrame: 0, bucle: false },
    speed: 0,
    friction: { y: 1, x: 1 },
    hasAlfa: false,
    lifeTime: 10,
    animationParticle: { scaleDelta: 0, rotationDelta: 0 }
  }) {
    super(args);
    this.animationParticle = args.animationParticle;
    this.friction = args.friction;
    this.hasAlfa = args.hasAlfa;
    this.lifeTime = args.lifeTime;
    this.drawLayer = 20;
    this.typeContent = Particle;
    this.type = "particle";

  };
  update(deltaTime, ecene) {
    if (this.animationParticle) {
      if (this.animationParticle.scaleDelta) this.size += this.animationParticle.scaleDelta * deltaTime;
      if (this.animationParticle.rotationDelta) this.rotation += this.animationParticle.rotationDelta * deltaTime;
      
    }
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

    if (this.friction) {
      this.vel.x *= this.friction.x;
      this.vel.y *= this.friction.y;
    }

    super.update(deltaTime, ecene);
  };
}