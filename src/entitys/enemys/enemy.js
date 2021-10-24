class Enemy extends EntityMove {
  constructor(args = { size: 20, effectDestroy: new effect(), img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 }, speed: 0 }) {
    super(args);
    this.drawLayer = 10;
    this.typeContent = Enemy;
    this.type = 'enemy';
  };
  update(deltaTime, ecene) {
    global.findObject('player').forEach((player) => {
      if (this.collicionObject(player)) {
        this.destroy();
        player.destroy();
      };
    });

    super.update(deltaTime, ecene);
  };
  destroy(){
    super.destroy();
    if(Math.random() > 0.9){
      global.coinsAnuke += MathFs.randInit(1,2);
      effects.anukeCoin.at(this.x, this.y, this.rotation, this);
    };
    global.points = global.points + 50;
    
  }
}