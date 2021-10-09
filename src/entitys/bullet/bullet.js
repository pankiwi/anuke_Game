class Bullet extends EntityMove {
  constructor(args = { size: 20, img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 }, speed: 0, lifeTime: 100 }) {
    super(args);
    if (args.lifeTime) this.lifeTime = args.lifeTime;

    this.typeContent = Bullet;
    this.type = 'bullet';
  };
  debugCollicion(ctx = new CanvasRenderingContext2D) {
    super.debugCollicion(ctx);
    if (this.lifeTime && this.lifeTime > 0) {
      Draw.DrawTxt(ctx, this.x, this.y + this.sizeHit/3, 200, 50, "white",`${Math.floor(this.lifeTime)}`, "center", "Arial", 1,true,"black",10);
    }
  }
  update(deltaTime, ecene) {
    global.findObject('enemy').forEach((enemy) => {
      if (this.collicionObject(enemy)) {
        this.destroy();
        enemy.destroy();
      };
    });

    if (this.lifeTime) {
      if (this.lifeTime <= 0){
        this.removeObject = true;
      }else{
      this.lifeTime -= deltaTime;
      }
    }

    super.update(deltaTime, ecene);
  };
}