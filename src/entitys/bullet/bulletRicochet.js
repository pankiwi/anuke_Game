class BulletRicochet extends Bullet {
  constructor(args = { size: 20, effectDestroy: new effect(), img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 }, speed: 0, lifeTime: 100, fragmet: { bullet: new EntityMove(), amount: 0, rotationFragmemts: 10, } }) {
    super(args)

    this.typeContent = BulletRicochet;
  };
  removeScreend(ecene) {
    /** remove object screend **/
    if (this.x >= ecene.gameWidth - this.sizeHit || this.x <= 0 + this.sizeHit) {
      this.vel.x = -this.vel.x;
      this.rotation *= Math.PI * 2;
    }

    if (this.y >= ecene.gameHeight - this.sizeHit || this.y <= 0 + this.sizeHit) {
      this.vel.y = -this.vel.y;
      this.rotation *= Math.PI * 2;
    }
  }
}