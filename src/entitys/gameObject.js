class GameObject {
  removeObject = false
  constructor(x, y, size, rotation) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.size = size * global.WindowRadius;
    this.sizeHit = size / 2 * global.WindowRadius;
    this.type = "GameObject";
    this.canUpdate = false;

  };
  draw(ctx = new CanvasRenderingContext2D) {
    //TODO
  };
  debugCollicion(ctx) {
    let x, y;
    
    x = this.x + Math.cos(Math.PI * this.rotation / 180) * this.size;
    y = this.y + Math.sin(Math.PI * this.rotation / 180) * this.size;
    
    Draw.DrawCircle(ctx, this.x, this.y, this.sizeHit, "blue");
   
   Draw.DrawLine(ctx, this.x, this.y, x, y, 5, "red")
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