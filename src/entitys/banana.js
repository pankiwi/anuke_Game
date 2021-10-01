class banana extends EntityMove {
  constructor(x, y, size, rotation, img, spriteSheet = {hasAnimation:false,width:0,height:0,frames:0,SpeedFrame:0}, speed, vel) {
    super(x, y, size, rotation, img, spriteSheet, speed, vel);
  };
  update(deltaTime,ecene) {
    global.findObject('bullet').forEach((bullet) => {
      if (this.collicionObject(bullet)) {
        this.destroy();
        bullet.destroy();
      }
    })
    
    super.update(deltaTime,ecene);
  }
}


function SpawEntityBananaAngle(x = 0, y = 0, size, img, SpriteSheet = { hasAnimation: false, width: 0, height: 0, frames: 0, SpeedFrame: 0 }, speed, angle) {
  global.addObjectGame(new banana(x, y, size, img, spriteAnimation, speed, { x: Math.cos(angle), y: Math.sin(angle) }));
}