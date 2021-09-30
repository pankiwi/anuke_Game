class Game {
  
  constructor() {
    this.ClientDriveMobil = null;
    this.canvas = null;
    this.ctx = null;
    this.sprites = null;
    this.oldTimeStamp = 0;
    this.gameHeight = 0;
    this.gameWidth = 0;
    this.sprites = null;

    this.init();
  };
  init() {
    this.ClientDriveMobil = Viewport.GetUserDrive();

    this.canvas = document.querySelector("canvas").getContext("2d");

    this.canvas.canvas.width = innerWidth;
    this.canvas.canvas.height = innerHeight;

    /* scrend canvas */
    this.ctx = document.createElement("canvas").getContext("2d");
    // resize
    this.ctx.canvas.width = Viewport.ReziseCanvas(this.ClientDriveMobil, this.ctx.canvas).x;
    this.ctx.canvas.height = Viewport.ReziseCanvas(this.ClientDriveMobil, this.ctx.canvas).y;

    global.WindowRadius = this.canvas.canvas.width / this.ctx.canvas.width;

    this.gameHeight = this.ctx.canvas.height;
    this.gameWidth = this.ctx.canvas.width;

    this.sprites = {
      anuke: new Image(),
      router: new Image(),
      banana: new Image()
    };

    this.sprites.anuke.src = './assets/sprites/anuke.png';
    this.sprites.router.src = './assets/sprites/router.png';
    this.sprites.banana.src = './assets/sprites/banana.png';

    this.InitGame();

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    this.banana = new spriteAnimation(this.sprites.banana,32,60,100,13,200,200)
  };
  InitGame() {

  };
  gameLoop(timeStamp) {
    var deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.UpdateGame(deltaTime);
    this.DrawGame();

    requestAnimationFrame(( timeStamp) => this.gameLoop(timeStamp))
    
  };
  DrawGame() {
    this.banana.draw(this.ctx,200,200)
    Draw.RenderCanvas(this.canvas, this.ctx);

    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
     
    
    global.ObjectGame.forEach((object, indexObject) => {
      object.draw(this.ctx);
      if (global.debuger) {
        object.debugCollicion(this.ctx);
      };
    });
  };
  UpdateGame(deltaTime) {
    this.banana.update(deltaTime)
    /** remove object **/
    global.removeObjectGame();
    global.removeParticle();

    /** update Object **/
    global.ObjectGame.filter(object => object.canUpdate).forEach(object => {
      object.update(deltaTime, this);
      //  console.log(object)
    });

    global.Particles.filter(object => object.canUpdate).forEach(object => {
      object.update(deltaTime, this);
      //  console.log(object)
    });


  };
};