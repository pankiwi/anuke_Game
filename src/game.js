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
      banana: new Image(),
      juction: new Image(),
      hull: new Image()
    };

    this.sprites.anuke.src = './assets/sprites/anuke.png';
    this.sprites.router.src = './assets/sprites/router.png';
    this.sprites.banana.src = './assets/sprites/banana.png';
    this.sprites.juction.src = './assets/sprites/juction.png';
    this.sprites.hull.src = './assets/sprites/hull.png';

    window.addEventListener('resize', () => {
      // resize
      this.ctx.canvas.width = Viewport.ReziseCanvas(this.ClientDriveMobil, this.ctx.canvas).x;
      this.ctx.canvas.height = Viewport.ReziseCanvas(this.ClientDriveMobil, this.ctx.canvas).y;

      global.WindowRadius = this.canvas.canvas.width / this.ctx.canvas.width;

      this.gameHeight = this.ctx.canvas.height;
      this.gameWidth = this.ctx.canvas.width;
    })

    window.addEventListener('pageshow', () => { global.UpdateGame = true })

    window.addEventListener('pagehide', () => { global.UpdateGame = false });

    window.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 32:
          global.pause();
          break;
      }

    })

    this.InitGame();

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  };
  InitGame() {
    //cretre type player
    this.playerBullets = [
      ];
    let banana = new BulletRicochet({
      size: 200,
      img: this.sprites.banana,
      animation: {
        frames: 14,
        speedFrame: 200,
        width: 32,
        height: 60
      },
      speed: 400,
      lifeTime: 1 //s
    })

    let enemy = new Enemy({
      size: 200,
      img: this.sprites.anuke,
      speed: 100
    });
    enemy.at(500, 0, 95)

    let player = new EntityPlayer({
      size: 120,
      img: this.sprites.anuke,
      hullSprite: this.sprites.hull
    })

    player.setInit(this.gameWidth / 2, this.gameHeight / 2, 270)

    global.addObjectGame(player)

    //player
    this.player = global.findObject("player")[0];

    this.canvas.canvas.addEventListener('click', (event) => {
      event.preventDefault();
      let x, y;
      let rot = MathFs.getAngle(event.clientX, innerWidth / 2, event.clientY, innerHeight / 2);
      this.player.setRotation(rot);

      banana.at(this.gameWidth / 2, this.gameHeight / 2, rot)
    })
    this.rot = 0
  };
  gameLoop(timeStamp) {
    var deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    if (global.UpdateGame) this.UpdateGame(deltaTime);
    this.DrawGame();

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp))

  };
  DrawGame() {
    Draw.RenderCanvas(this.canvas, this.ctx);

    this.ctx.fillStyle = 'rgba(255,255,255,.22)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


    global.ObjectGame.forEach((object, indexObject) => {
      try {
        object.draw(this.ctx);
        if (global.debuger) {
          object.debugCollicion(this.ctx);
        };
      } catch (e) {
        console.table(object);
        object.removeObject = true
      }
    });
    let arg = [10, 20, 30, 40, 50, 60];
    let argColor = ["red", "blue", "cyan", "purple", "black", "orange"]
    for (let i in arg) {
      let x, y;

      x = (600 + Math.cos(Math.PI * this.rot / 180) * 40) + Math.cos(Math.PI * this.rot / 180) * 20 * i;
      y = (600 + Math.sin(Math.PI * this.rot / 180) * 40) + Math.sin(Math.PI * this.rot / 180) * 20 * i;
      this.ctx.save();
      this.ctx.globalAlpha = 1;
      Draw.DrawCircle(this.ctx, 600, 600, 20, "pink")
      Draw.DrawImage(this.ctx, this.sprites.anuke, x, y, 1, 20, this.rot)
      Draw.DrawLine(this.ctx, 600, 600, x, y, 5, argColor[i])

      this.ctx.restore();
    }
  };
  UpdateGame(deltaTime) {
    this.rot++
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