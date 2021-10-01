class EntityPlayer extends Entity {
  constructor( x, y, size, img ) {
    super( x, y, size, img, {hasAnimation: false});
    this.type = "player";
  };
  update(){};
};

function SpawPlayer(x, y, size, img){
  global.addObjectGame( new EntityPlayer(x, y, size, img));
};