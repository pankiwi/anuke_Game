class GameObject {
  removeObject = false
  constructor(args = { size: 10, effectDestroy: new effect() }) {
    /* for clone type */
    this.args = args;
    /* coords */
    this.x = 0;
    this.y = 0;
    /* angle */
    this.rotation = 270;
    /* width */
    this.size = args.size * global.WindowRadius;
    /* real width */
    this.sizeHit = (args.size / 2) * global.WindowRadius;
    /* effect */
    this.effectDestroy = args.effectDestroy;
    /* things */
    this.drawLayer = 1// OBJECT
    
    this.typeContent = GameObject;
    this.type = "GameObject";
    this.canUpdate = false;
  };
  getSize() {
    return this.size/global.WindowRadius;
  };
  getBox() {
    return (this.size/global.WindowRadius)/2;
  };
  setInit(x = 0, y = 0, rotation = 270) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
  draw(ctx = new CanvasRenderingContext2D) {
    //TODO
  };
  debugCollicion(ctx = new OffscreenCanvasRenderingContext2D) {
    let x, y;

    x = this.x + MathFs.trnsX(this.rotation, this.sizeHit * 2);
    y = this.y + MathFs.trnsY(this.rotation, this.sizeHit * 2);
    ctx.save();
    ctx.globalAlpha = 0.2;
    Draw.DrawCircle(ctx, this.x, this.y, this.sizeHit, "blue");

    Draw.DrawLine(ctx, this.x, this.y, x, y, 20 * global.WindowRadius, "red")
    ctx.restore();
  }
  update(deltaTime, ecene) {
    //TODO
  };
  //colicion :)
  collicionObject(object) {
    if (object) {
      if (MathFs.DistanceObjects(this.x, this.y, object.x, object.y) < 1 + this.sizeHit + object.sizeHit) {
        return true;
      } else return false;

    };
  };
  destroy() {
    this.removeObject = true;
    this.effectDestroy.at(this.x, this.y, this.rotation, this);
  };
  remove() {
    this.removeObject = true;
  };
  at(x, y, rotation) {
    let clone = new this.typeContent(this.args);
    clone.setInit(x, y, rotation);
    
   let cloneObject =  global.addObjectGame(clone);
   
   return cloneObject
  };
};