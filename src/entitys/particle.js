class Particle extends EntityMove {
  constructor(args = {
    size: 20,
    img: new Image().src = "../assets/sprites/anuke.png",
    animation: { width: 0, height: 0, frames: 0, speedFrame: 0, bucle: false },
    speed: 0,
    friction: { y: 1, x: 1 },
    hasAlfa: false,
    lifeTime: 10,
    animationParticle: { scaleDelta: 0, rotationDelta: 0 },
    goTo: { size: { start: 0, end: 0, speed: 0 }, rotation: { start: 0, end: 0, speed: 0 } }
  }) {
    super(args);
    this.animationParticle = args.animationParticle;
    this.goTo = args.goTo;
    this.friction = args.friction;
    this.hasAlfa = args.hasAlfa;
    this.lifeTime = args.lifeTime;
    this.drawLayer = 20;
    this.typeContent = Particle;
    this.type = "particle";

    if (this.goTo) {
      if (this.goTo.size) this.size = this.goTo.size.start * global.WindowRadius;
      if (this.goTo.rotation) this.rotation = this.goTo.size.rotation;
    }

  };
  update(deltaTime, ecene) {
    if (this.goTo) {
      if (this.goTo.size) {
        if (this.size > this.goTo.size.end) this.size -= this.goTo.size.speed * deltaTime;
        if (this.size < this.goTo.size.end) this.size += this.goTo.size.speed * deltaTime;
      }
      if (this.goTo.rotation) {
        if (this.rotation > this.goTo.rotation.end) this.rotation -= this.goTo.rotation.speed * deltaTime;
        if (this.rotation < this.goTo.rotation.end) this.rotation += this.goTo.rotation.speed * deltaTime;
      }

    }

    if (this.animationParticle) {
      if (this.animationParticle.scaleDelta && !this.goTo.size) this.size += this.animationParticle.scaleDelta * deltaTime;
      if (this.animationParticle.rotationDelta && !this.goTo.rotation) this.rotation += this.animationParticle.rotationDelta * deltaTime;
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