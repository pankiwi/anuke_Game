class Game {

  constructor() {
    this.ClientDriveMobil = null;
    this.canvas = null;
    this.ctx = null;
    this.oldTimeStamp = 0;
    this.gameHeight = 0;
    this.gameWidth = 0;
    this.pauseGame = false;
    this.startGame = false;

    this.init();
  };
  init() {
    this.ClientDriveMobil = Viewport.GetUserDrive();

    this.ui = {
      modal: document.getElementById('ui-playerStat'),
      rp: document.getElementById('rp_2'),
      c: document.getElementById('c_2'),
      pauseBtn: document.getElementById('pauseBtn'),
      shopBtn: document.getElementById('shopBtn'),
      shopModal: document.getElementById('shop-modal')
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
    if (this.ui.shopBtn) {
      this.ui.shopBtn.addEventListener('click', () => {
        if (!this.pauseGame) this.pause();
        if (this.ui.shopModal.classList.contains('hidden_')) {
          this.ui.shopModal.classList.add('show_');
          this.ui.shopModal.classList.remove('hidden_');
          try {
            this.shop.setUpItems()
          } catch (e) {
            console.log(e)
          }
        } else {
          this.ui.shopModal.classList.remove('show_');
          this.ui.shopModal.classList.add('hidden_');
        }
      })
    }
  };
  InitGame() {
   this.resetBackground();
   
    this.startGame = true;

    document.getElementById("resetGame").addEventListener('click', () => {

      document.getElementById("ui-dead").classList.remove('show_');
      document.getElementById("ui-dead").classList.add('hidden_');

      this.resetGame();
    })

    this.spawEntitys = new GenerstionInterval(false, () => {
         spawEnemyBasic(this)
    }, 0)

    if (this.ui) this.ui.modal.classList.add('show_');

    this.round = 1;
    this.roundPointTotal = 1;

    this.spawEntitys.chanceTime(2000);
    
    this.setPlayerBullets();
    
    //player
    this.setPlayer();
    //shot
    addEventListener('click', (event) => {
      event.preventDefault();
      if (!this.pauseGame && this.startGame && this.player != null && !this.player.dead) {
        let x, y;
        let rot = MathFs.getAngle(event.clientX, innerWidth / 2, event.clientY, innerHeight / 2);
        this.player.setRotation(rot);
        this.playerBullets.atShot(this.gameWidth / 2, this.gameHeight / 2, rot)
        global.sound.play('shot',0.1)
      }
    })

    this.setShop();
    this.gameLoop(0);

  };
  setPlayerBullets() {
    //cretre type player
    this.playerBullets = new playerShotConfig();

    this.playerBullets.addBullet({
      type: new Bullet({
        size: 60,
        img: global.atlas.find("router"),
        speed: 600,
        effectDestroy: effects.explotionEntitySmall
      }),
      chanceShot: 1
    })

  };
  setPlayer() {
    //player

    let player = new EntityPlayer({
      size: 120,
      img: global.atlas.find("anuke"),
      hullSprite: global.atlas.find("hull")
    })


    player.setInit(this.gameWidth / 2, this.gameHeight / 2, 270)

    this.player = global.addObjectGame(player)

  };
  setShop() {
    this.shop = new shopClass('shop', 'closeShop', 2, {
      setShop: (this_) => {
        if (this_.items.length === 0) {
          const floppa = document.getElementById("floppaSay");
          floppa.innerHTML = "Thank you, you paid for my university";
        } else {

          let words = ["i like coins and you?", "welcome", "If you do not have coins, out the ¡SHOP!", "you have ¿kromer?", "anuke like frogs", "modding is hell", "NOW'S YOUR CHANCE TO BE A"];
          const floppa = document.getElementById("floppaSay");
          let selectWord = Math.floor(Math.random() * words.length);
          floppa.innerHTML = words[selectWord];
        }
      },
      failBuy: (item) => {
        let words = ["you not have money", `you need ${item.price - global.coinsAnuke} coins more`, "you not are BIG SHOT"];
        const floppa = document.getElementById("floppaSay");
        let selectWord = Math.floor(Math.random() * words.length);
        floppa.innerHTML = words[selectWord];
      },
      sell: (item) => {
        let words = ["thanks you", `next have more item and you need more coins`];
        let wordsFree = ["wtf", `why is free ${item.name}`, "...", "[HyperLink bloked]"];
        const floppa = document.getElementById("floppaSay");
        let selectWord = Math.floor(Math.random() * words.length);
        let selectWordFree = Math.floor(Math.random() * words.length);

        if (item.price === 0) {
          floppa.innerHTML = wordsFree[selectWordFree];
        } else {
          floppa.innerHTML = words[selectWord];
        }
      },
      closeShop: () => {
        this.pause();
        this.ui.shopModal.classList.remove('show_');
        this.ui.shopModal.classList.add('hidden_');
      }
    });

    this.shop.addItem("", {
      name: "Router Ricochet",
      description: "anuke can shot router can ricochet",
      price: 30,
      buy: () => {
        this.playerBullets.addBullet({
          type: new BulletRicochet({
            size: 60,
            img: global.atlas.find("router"),
            speed: 400,
            effectDestroy: effects.explotionEntitySmall,
            lifeTime: 10
          }),
          chanceShot: 0.4
        })

      }
    })
    this.shop.addItem("", {
      name: "Router Bomb",
      description: "anuke can shot router can fragment mini router's",
      price: 10,
      buy: () => {
        this.playerBullets.addBullet({
          type: new Bullet({
            size: 100,
            img: global.atlas.find("router"),
            speed: 300,
            trailEffect: effects.trailEffect,
            effectDestroy: effects.explotionEntitySmall,
            fragmet: {
              bullet: new Bullet({
                size: 50,
                img: this.sprites.router,
                effectDestroy: effects.explotionEntitySmall,
                speed: 400,
                lifeTime: 3
              }),
              amount: 3
            }
          }),
          chanceShot: 0.2
        })

      }
    })
  };
  resetBackground() {
    this.backgroundColor = 'rgb(255,255,255)';
    this.toBackgroundColor = null;
    //5s
    this.opacitySteps = parseInt(60 * 5);
    this.opacityStep = 0;
    
    this.timerColor = 0;
    //20s
    this.timerColorLimit = parseInt(60 * 15);
  };
  resetGame() {
    this.resetBackground();
    this.setShop();

    global.points = 0;
    global.coinsAnuke = 0;
    global.clearObjects();
    this.round = 1;
    this.roundPointTotal = 1;

    this.spawEntitys.chanceTime(2000);
    this.setPlayer();
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

      if (global.points >= Math.floor((this.round * 500) * this.roundPointTotal) && this.spawEntitys.getTime() >= 800 && this.player != null && !this.player.dead) {
        this.round += 1;
        this.roundPointTotal *= 1.01;
        effects.chanceRound.at(this.player.x, this.player.y);
        global.findObject('enemy').forEach((enemy) => {
          enemy.remove();
        })
        this.spawEntitys.stop();

        setTimeout(() => {
          if (this.spawEntitys.getTime() > 500) this.spawEntitys.chanceTime(this.spawEntitys.getTime() - 50);
        }, 500)
      }
      if (global.UpdateGame) this.UpdateGame(deltaTime);

      this.DrawGame();

    }

    //dead
    if (this.player != null && this.player.dead) {
      this.player = null;
      this.spawEntitys.stop();
      global.findObject('enemy').forEach((enemy) => {
        enemy.remove();
      })
      effects.playerDead.at(this.gameWidth / 2, this.gameHeight / 2);
      setTimeout(() => {
        document.getElementById("ui-dead-points").innerHTML = global.points;
        document.getElementById("ui-dead-coins").innerHTML = global.coinsAnuke;

        document.getElementById("ui-dead").classList.add('show_');
        document.getElementById("ui-dead").classList.remove('hidden_');
      }, 2000)

    }

  }
  DrawGame() {
    
    Draw.RenderCanvas(this.canvas, this.ctx);
    
    this.DrawBackGround();
    
    


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
    if(this.timerColor++ >= this.timerColorLimit){
      this.timerColor = 0;
      this.chanceColorBackground();
    }
    /** remove object **/
    global.removeObjectGame();


    /** update Object **/
    global.ObjectGame.filter(object => object.canUpdate).forEach(object => {
      object.update(deltaTime, this);
      //  console.log(object)
    });
  };
  chanceColorBackground() {
    this.toBackgroundColor = `hsl(${ Math.random() * 360}, 100%, 97%)`
  };
  DrawBackGround() {
    if (this.toBackgroundColor != null && this.toBackgroundColor != this.backgroundColor) {
     
      // calculate the current opacity as a percentage
      // of opacityStep/opacitySteps
      var opacity = 100 * (this.opacityStep / this.opacitySteps);
      if (this.opacityStep >= this.opacitySteps - 1) { opacity = 100; }
  
      this.ctx.clearRect(0, 0, this.ctx.canvas.with, this.ctx.canvas.height);
      this.ctx.save();
  
      // draw with the starting color using a lessening opacity
      this.ctx.globalAlpha = (100 - opacity) / 100;
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      
  
      // draw with the ending color using a increasing opacity
      this.ctx.globalAlpha = (opacity) / 100;
      this.ctx.fillStyle = this.toBackgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.restore();
  
  
      // return if all steps have been played
      if (++this.opacityStep >= this.opacitySteps) {
        this.backgroundColor = this.toBackgroundColor;
        this.toBackgroundColor = null;
        this.opacityStep = 0;
      }
    } else {
      this.ctx.clearRect(0, 0, this.ctx.canvas.with, this.ctx.canvas.height);
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
  
};