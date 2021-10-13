class EntityPlayer extends Entity {
  hulls = 0; //number hull 
  maxHulls = 5;
  dead = false; //TODO
  constructor(args = { size: 20, effectDestroy: new effect(), img: new Image().src = "../assets/sprites/anuke.png", hullSprite: new Image(), animation: { width: 0, height: 0, frames: 0, speedFrame: 0 } }) {
    super(args);
    this.hullImg = args.hullSprite;
    
    this.drawLayer = 19; //Max
    
    this.typeContent = EntityPlayer;

    this.type = "player";
  };
  draw(ctx = new CanvasRenderingContext2D) {
    super.draw(ctx);

    if (this.hulls > 0) {
      for (var i = 0; i < this.hulls; i++) {
        let x, y;

        x = this.x + MathFs.trnsX(this.rotation, this.sizeHit / 4) + MathFs.trnsX(this.rotation + (0.01 * i), (this.sizeHit + this.sizeHit / 3) + (this.sizeHit / 2 * i));
        y = this.y + MathFs.trnsY(this.rotation, this.sizeHit / 4) + MathFs.trnsY(this.rotation + (0.01 * i), (this.sizeHit + this.sizeHit / 3) + (this.sizeHit / 2 * i));

        Draw.DrawImage(ctx, this.hullImg, x, y, 1, this.size, this.rotation);
      }
    }
  };
  update() {
    //TODO
  };
  setRotation(rot) {
    this.rotation = rot;
  };
  destroy() {
    if (this.hulls > 0) {
      this.hulls--;
      global.findObject('enemy').forEach((enemy) => {
        if (enemy) {
          let distance = MathFs.DistanceObjects(this.x, this.y, enemy.x, enemy.y);
          if (distance < 200 + this.sizeHit + enemy.sizeHit) enemy.destroy();
        }
      })
    } else {
      this.dead = true;
    }
  };
};