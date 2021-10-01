class Entity extends GameObject {
  constructor(x, y, size, rotation, img, SpriteSheet = { hasAnimation: false, width: 0, height: 0, frames: 0, SpeedFrame: 0 }) {
    super(x, y, size, rotation);
    this.img = img;
    this.alfa = 1;
    this.SpriteSheet = SpriteSheet;
    if (this.SpriteSheet.hasAnimation) this.Animator = new spriteAnimation(this.img, SpriteSheet.width, SpriteSheet.height, SpriteSheet.SpeedFrame, SpriteSheet.frames,this.size);

    this.type = "EntityNull";
    this.canUpdate = true;
  };
  draw(ctx = new CanvasRenderingContext2D) {
    if (!this.SpriteSheet.hasAnimation){
      Draw.DrawImage(ctx, this.img, this.x, this.y, this.alfa, this.size, this.rotation);
    }else if (this.SpriteSheet.hasAnimation){ 
      this.Animator.draw(ctx, this.x, this.y, this.rotation, this.alfa);
      
    }
  }
  removeScreend(ecene) {
    /** remove object screend **/
    if (this.x > ecene.gameWidth + this.sizeHit) this.removeObject = true;

    if (this.x > ecene.gameHeight + this.sizeHit) this.removeObject = true;

    if (this.x < 0 - this.sizeHit) this.removeObject = true;

    if (this.y < 0 - this.sizeHit) this.removeObject = true



  };
  update(deltaTime, ecene) {
    if(this.SpriteSheet.hasAnimation) this.Animator.update(deltaTime)
    
    this.removeScreend(ecene)
  };
};