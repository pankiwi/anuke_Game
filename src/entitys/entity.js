class Entity extends GameObject {
  constructor(x, y, size, img) {
    super(x, y, size);
    this.img = img;
    this.alfa = 1;
    this.type = "EntityNull";
    this.canUpdate = true;
  };
  draw(ctx = new CanvasRenderingContext2D) {
    Draw.DrawImage(ctx, this.img, this.x, this.y, this.alfa, this.size);
  };
  removeScreend(ecene) {
    /** remove object screend **/
    if (this.x > ecene.gameWidth + this.sizeHit) this.removeObject = true;
    
    if (this.x > ecene.gameHeight + this.sizeHit) this.removeObject = true;

    if (this.x < 0 - this.sizeHit) this.removeObject = true;

    if (this.y < 0 - this.sizeHit) this.removeObject = true

    

  };
  update(ecene){
    this.removeScreend(ecene)
  };
};