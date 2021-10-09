class Enemy extends EntityMove {
  constructor(args = { size: 20, img: new Image().src = "../assets/sprites/anuke.png", animation: { width: 0, height: 0, frames: 0, speedFrame: 0 }, speed: 0 }) {
    super(args);
    this.typeContent = Enemy;
    this.type = 'enemy';
  };
  update(deltaTime, ecene){
    global.findObject('player').forEach((player) => {
      if (this.collicionObject(player)) {
        this.destroy();
        player.destroy();
      };
    });
    
    super.update(deltaTime, ecene);
  };
}