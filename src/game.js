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
    this.pauseGame = false;
    this.startGame = true;
    this.init();
  };
  init() {
    this.ClientDriveMobil = Viewport.GetUserDrive();

    if (this.ClientDriveMobil) {
      this.ui = {
        modal: document.getElementById('ui_2'),
        rp: document.getElementById('rp_2'),
          c: document.getElementById('c_2'),
        pauseBtn: document.getElementById('pauseBtn')
      }
    } else {
      this.ui = {
        modal: document.getElementById('ui_1'),
        rp: document.getElementById('rp_1'),
        c: document.getElementById('c_1')
      }
    }

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
      junction: new Image(),
      hull: new Image(),
      coin: new Image()
    };

    this.sprites.anuke.src = './assets/sprites/anuke.png';
    this.sprites.router.src = './assets/sprites/router.png';
    this.sprites.banana.src = './assets/sprites/banana.png';
    this.sprites.junction.src = './assets/sprites/junction.png';
    this.sprites.hull.src = './assets/sprites/hull.png';
    this.sprites.coin.src = './assets/sprites/coin.png';
    this.clickModal = 0

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
          this.pause();
          break;
      }

    })
    if (this.ui.pauseBtn) {
      this.ui.pauseBtn.addEventListener('click', () => {
        this.pause();
      })
    }
    
    this.InitGame();

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
  };
  InitGame() {
    if (this.ui) this.ui.modal.classList.add('show_');



    this.spawEntitys = new GenerstionInterval(true, () => {
      spawEnemyBasic(this)

    }, 1000)
    spawEnemyBasic(this)
    //cretre type player
    this.playerBullets = new playerShotConfig();

    this.playerBullets.addBullet({
      type: new Bullet({
        size: 60,
        img: this.sprites.router,
        speed: 600,
        effectDestroy: effects.explotionEntitySmall
      }),
      chanceShot: 1
    })
    //player
    let player = new EntityPlayer({
      size: 120,
      img: this.sprites.anuke,
      hullSprite: this.sprites.hull
    })


    player.setInit(this.gameWidth / 2, this.gameHeight / 2, 270)

    this.player = global.addObjectGame(player)

    //shot
    window.addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.pauseGame && this.startGame) {
        let x, y;
        let rot = MathFs.getAngle(event.clientX, innerWidth / 2, event.clientY, innerHeight / 2);
        this.player.setRotation(rot);
        this.playerBullets.atShot(this.gameWidth / 2, this.gameHeight / 2, rot)

        Sounds.PlaySound('shot', 0.01)
      }
    })
  };
  pause() {
    if (!this.pauseGame) {
      this.pauseGame = true;
      this.spawEntitys.stop();
      global.pause();
    } else {
      this.pauseGame = false;
      this.spawEntitys.start();
      global.pause();
    }
  }
  gameLoop(timeStamp) {
    var deltaTime = (timeStamp - this.oldTimeStamp) / 1000;
    this.oldTimeStamp = timeStamp;

    this.update(deltaTime);

    requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp))

  };
  //updateAll
  update(deltaTime) {
    if (this.startGame) {
       this.ui.c.innerHTML = global.coinsAnuke;
       this.ui.rp.innerHTML = global.points;
      if (global.UpdateGame) this.UpdateGame(deltaTime);

      this.DrawGame();

    }

  }
  DrawGame() {
    Draw.RenderCanvas(this.canvas, this.ctx);

    this.ctx.fillStyle = 'rgba(555,555,555,.22)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


    global.ObjectGame.forEach((object, indexObject) => {
      try {
        object.draw(this.ctx);
        if (global.debuger) {
          object.debugCollicion(this.ctx);
        };
      } catch (e) {
        console.table(object);
        console.log(e)
        object.removeObject = true
      }
    });

    if (this.pauseGame) Draw.DrawTxt(this.ctx, this.gameWidth / 2, this.gameHeight / 2, 300, 100, 'white', "pause", "center", "Arial", 1, true, "black", 10)


  };

  UpdateGame(deltaTime) {

    /** remove object **/
    global.removeObjectGame();


    /** update Object **/
    global.ObjectGame.filter(object => object.canUpdate).forEach(object => {
      object.update(deltaTime, this);
      //  console.log(object)
    });




  };
};