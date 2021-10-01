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
    this.banana = new spriteAnimation(this.sprites.banana, 32, 60, 500, 14, 200)
  };
  InitGame() {
    this.imgRotate = 0
    global.addObjectGame(new Entity(600, 600, 200, 46, this.sprites.banana, { hasAnimation: true, width: 32, height: 60, frames: 14, SpeedFrame: 20 }))
    global.addObjectGame(new Entity(200, 600, 200, 46, this.sprites.anuke, { hasAnimation: false, width: 32, height: 60, frames: 14, SpeedFrame: 20 }))
    SpawEntityMove(0, 600, 200, 0, this.sprites.banana, { hasAnimation: true, width: 32, height: 60, frames: 14, SpeedFrame: 100 }, 100)

    window.addEventListener('pageshow', () => { global.UpdateGame = true }) 
    
    window.addEventListener('pagehide', () => { global.UpdateGame = false });
    
    window.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 32:
          global.pause();
          break;
      }
      
    })
  };
  gameLoop(timeStamp) {
    var deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    if (global.UpdateGame) this.UpdateGame(deltaTime);
    this.DrawGame();

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp))

  };
  DrawGame() {
    this.banana.draw(this.ctx, 200, 200, 270, 1)
    Draw.DrawImage(this.ctx, this.sprites.router, 400, 400, 1, 200, this.imgRotate)
    Draw.RenderCanvas(this.canvas, this.ctx);

    this.ctx.fillStyle = 'rgba(255,255,255,.22)';
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
    this.imgRotate += 100 * deltaTime
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