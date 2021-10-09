class Entity extends GameObject {
  constructor(args = { size: 20, img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 } }) {
    super(args);
    this.img = args.img;
    this.alfa = 1;
    this.animation = args.animation;
    if (args.animation) this.animator = new spriteAnimation(this.img, args.animation.width, args.animation.height, args.animation.speedFrame, args.animation.frames, this.size);
    this.typeContent = Entity;
    this.type = "EntityNull";
    this.canUpdate = true;
  };
  draw(ctx = new CanvasRenderingContext2D) {
    if (this.animation) {
      this.animator.draw(ctx, this.x, this.y, this.rotation, this.alfa);
    } else {
      Draw.DrawImage(ctx, this.img, this.x, this.y, this.alfa, this.size, this.rotation);
    };
  }
  removeScreend(ecene) {
    /** remove object screend **/
    if (this.x > ecene.gameWidth + this.sizeHit) this.removeObject = true;

    if (this.x > ecene.gameHeight + this.sizeHit) this.removeObject = true;

    if (this.x < 0 - this.sizeHit) this.removeObject = true;

    if (this.y < 0 - this.sizeHit) this.removeObject = true;
  };
  update(deltaTime, ecene) {
    if (this.animation) this.animator.update(deltaTime);

    this.removeScreend(ecene);
  };
};