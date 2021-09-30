ñ
class Particle extends Entity {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img);
    this.speed = speed;
    this.angle = MathFs.AngleToRadians(angle);
    this.pierce = false;
    this.alfa = 1;
    this.type = "none";
  };
  draw(ctx){
    Draw.DrawImage(ctx,this.img,this.x,this.y,this.alfa,this.size)
  }
  update(ecene) {

    global.findObject('enemy').forEach((enemy) => {
      if (this.collicionObject(enemy)) {
        this.destroy();
        enemy.destroy();
      }
    })

    super.update(ecene)


    /** move bullet **/
    if(this.alfa > 0){
    this.alfa -= 0.1
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    }else this.removeObject = true
  };
  destroy() {
  //TODO
  };
};

function SpawParticles(amount, x = 0, y = 0, MinSize, MaxSize, sprite, MinSpeed, MaxSpeed, MinAngle, MaxAngle) {
  for(let i = 0; i < amount; i++){
  global.addParticle(new Particle(x, y, , sprite, speed, angle));
  }
}