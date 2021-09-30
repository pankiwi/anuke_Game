class GameObject {
  removeObject = false
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size * global.WindowRadius;
    this.sizeHit = size / 2 * global.WindowRadius;
    this.type = "GameObject";
    this.canUpdate = false;

  };
  draw(ctx = new CanvasRenderingContext2D) {
    //TODO
  };
  debugCollicion(ctx) {
    Draw.DrawCircle(ctx, this.x, this.y, this.sizeHit, "blue");
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
  };
};