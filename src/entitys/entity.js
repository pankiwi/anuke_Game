class Entity extends GameObject {
  constructor(args = { size: 20, effectDestroy: new effect(), img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0, bucle: true } }) {
    super(args);
    /* img */
    this.img = typeof args.img == "object" ? args.img : global.atlas.find(args.img);
    /* alfa */
    this.alfa = 1;
    /*animation*/
    this.animation = args.animation;
    if (args.animation) this.animator = new spriteAnimation(this.img, args.animation.width, args.animation.height, args.animation.speedFrame, args.animation.frames);
    /* othrr */
    this.typeContent = Entity;
    this.type = "EntityNull";
    this.canUpdate = true;
  };
  draw(ctx = new CanvasRenderingContext2D) {
    if (this.animation) {
      this.animator.draw(ctx, this.x, this.y, this.rotation, this.alfa, this.size <= 0 ? 0.1 : this.size);
      
    } else {
      Draw.DrawImage(ctx, this.img, this.x, this.y, this.alfa, this.size <= 0 ? 0.1 : this.size, this.rotation);
    };
  }
  removeScreend(ecene) {
    /** remove object screend **/
    if (this.x > ecene.gameWidth + this.size || this.x < 0 - this.size ) this.remove();

    if (this.y > ecene.gameHeight + this.size  || this.y < 0 - this.size ) this.remove();

  };
  update(deltaTime, ecene) {
    if (this.animation) this.animator.update(deltaTime);

    this.removeScreend(ecene);
  };
};