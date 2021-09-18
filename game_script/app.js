
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//remove object
function removeObject(index, array = []) {
  array.splice(index, 1);
};

//kill all enemys
function killAllEnemys() {
  enemyObject.forEach((enemy, index) => {
    enemy.hit(index);
  });
};

//get angle center
function getAnglePlayer(x, y) {
  return Math.atan2(MAX_Y_GAME / 2 - y, MAX_X_GAME / 2 - x) * 180 / Math.PI;
};

// shot player
function shotPlayer(angle) {
  if (Math.random() < 0.3 && playerUpgrades.phaserBullet) {
    bulletsObject.push(new phser_bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, playerUpgrades.radiusBullet, playerUpgrades.speedBullet, angle));
  } else {
    bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, playerUpgrades.radiusBullet, playerUpgrades.speedBullet, angle));
  }
}

/*
 * Entitys fuction
 */
/* spawner TnT */
function spawTnt() {
  let x, y, angle, radius, speed;
  radius = 80;
  speed = 2;
  if (Math.random() > 0.5) {
    if (Math.random() < 0.5) {
      //left
      y = Math.random() * MAX_Y_GAME;
      x = 0 - radius;
      angle = 360;
      if (Math.sqrt(Math.pow(y - player.y, 2)) < player.radius) {
        y += Math.random() > 0.5 ? radius * 2 : -radius * 2;
      };
    } else {
      //right
      y = Math.random() * MAX_Y_GAME;
      x = MAX_X_GAME + radius;
      angle = 180;
      if (Math.sqrt(Math.pow(y - player.y, 2)) < player.radius) {
        y += Math.random() > 0.5 ? radius * 2 : -radius * 2;
      };
    };
  } else {
    if (Math.random() < 0.5) {
      //down
      y = 0 - radius;
      x = Math.random() * MAX_X_GAME;
      angle = 90;
      if (Math.sqrt(Math.pow(x - player.x, 2)) < player.radius) {
        x += Math.random() > 0.5 ? radius * 2 : -radius * 2;
      };
    } else {
      // up
      y = MAX_Y_GAME + radius;
      x = Math.random() * MAX_X_GAME;
      angle = 270;
      if (Math.sqrt(Math.pow(x - player.x, 2)) < player.radius) {
        x += Math.random() > 0.5 ? radius * 2 : -radius * 2;
      };
    }
  }
  powerUpObject.push(new tnt_router(x, y, angle, radius, speed));
}

/* spaw power up*/
function powerUp() {
  if (powerUpObject.length < 1) {
    let x, y, angle, radius, speed;
    radius = 80;
    speed = 2;
    if (Math.random() > 0.5) {
      if (Math.random() < 0.5) {
        //left
        y = Math.random() * MAX_Y_GAME;
        x = 0 - radius;
        angle = 360;
        if (Math.sqrt(Math.pow(y - player.y, 2)) < player.radius) {
          y += Math.random() > 0.5 ? radius * 2 : -radius * 2;
        };
      } else {
        //right
        y = Math.random() * MAX_Y_GAME;
        x = MAX_X_GAME + radius;
        angle = 180;
        if (Math.sqrt(Math.pow(y - player.y, 2)) < player.radius) {
          y += Math.random() > 0.5 ? radius * 2 : -radius * 2;
        };
      };
    } else {
      if (Math.random() < 0.5) {
        //down
        y = 0 - radius;
        x = Math.random() * MAX_X_GAME;
        angle = 90;
        if (Math.sqrt(Math.pow(x - player.x, 2)) < player.radius) {
          x += Math.random() > 0.5 ? radius * 2 : -radius * 2;
        };
      } else {
        // up
        y = MAX_Y_GAME + radius;
        x = Math.random() * MAX_X_GAME;
        angle = 270;
        if (Math.sqrt(Math.pow(x - player.x, 2)) < player.radius) {
          x += Math.random() > 0.5 ? radius * 2 : -radius * 2;
        };
      }
    }
    powerUpObject.push(new box_power_up(x, y, angle, radius, speed));
  };

};

/* spaw enemy */
function spawEnemy() {
  if (enemyObject.length <= 20) {

    let x, y, radiusEnemy, speed, angle;
    radiusEnemy = rand(50, 70);

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_X_GAME + radiusEnemy;
      y = Math.random() * MAX_Y_GAME;
    } else {
      y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME + radiusEnemy;
      x = Math.random() * MAX_X_GAME;
    };

    angle = getAnglePlayer(x, y);
    speed = Math.abs(Math.floor(10 - radiusEnemy / 8) + rand(-1, 1));
    enemyObject.push(new enemy(imgs.juction, x, y, radiusEnemy, speed, angle));

  };
};

/* spaw big enemy */
function spawBig_juction() {
  if (enemyObject.length <= 20) {

    let x, y, radiusEnemy, speed, angle;
    radiusEnemy = rand(70, 80);

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_X_GAME + radiusEnemy;
      y = Math.random() * MAX_Y_GAME;
    } else {
      y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME + radiusEnemy;
      x = Math.random() * MAX_X_GAME;
    };

    angle = getAnglePlayer(x, y);
    speed = Math.abs(Math.floor(10 - radiusEnemy / 10) + rand(-1, 1));
    enemyObject.push(new frag_enemy(imgs.juction, x, y, radiusEnemy, speed, angle));
  };
};


/* reset vars */
function resetGame() {
  enemyObject = [];
  bulletsObject = [];
  powerUpObject = [];
  playerUpgrades = {
    speedBullet: 15,
    radiusBullet: 20,
    max_speedBullet: 40,
    max_radiusBullet: 60,
    phaserBullet: false
  }
  points = 0;
  counterEnemy = 0;
  round = 1;
  stat_dif = 500;
  spawTime = 2000;
  chace_power_up = 1;
  TimeOut_active = false;
  atdead_particle = false;
  animatior.animations.forEach((animation_) => {
    animation_.enable = false;
    animation_.finish = false;
    animation_.i = 0;
  });
  UIConfig_.UIS.forEach((ui_) => {
    ui_.enable = false;
  });
  player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60);
}

const c = document.querySelector("canvas").getContext("2d");
//set Size
let radio_user 
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  c.canvas.width = innerWidth < 1000 ? 1000 : innerWidth;
  c.canvas.height = innerHeight < 1000 ? 1500 : innerHeight;
  radio_user = c.canvas.width/c.canvas.height
}else{
  c.canvas.width = innerWidth
  c.canvas.height = innerHeight
  radio_user = c.canvas.height/c.canvas.width
}

//set stat window
let MAX_X_GAME = c.canvas.width;
let MAX_Y_GAME = c.canvas.height;
//viewport radius

let canvas_viewport = c.canvas.getBoundingClientRect();
//star game :/

let star_game = false;
let debug = false;
//object
let bulletsObject = [];
let particleObject = [];
let enemyObject = [];
let powerUpObject = [];
//points/50 > counterEnemy = hecker
let points = 0;
let counterEnemy = 0;

/*
 to calculate the rounds enemys
*/
let round = 1;
let stat_dif = 500;
let spawTime = 2000;

/* chace spaw power up*/
let chace_power_up = 5;

/* player */
let player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60);
/*player upgrades */
let playerUpgrades = {
  speedBullet: 15,
  radiusBullet: 20,
  max_speedBullet: 40,
  max_radiusBullet: 60,
  phaserBullet: false
};

/* power ups */
let power_ups = [
  superShotRouter = () => {
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "super router shot"))
    Sound_source_.playRandomSound("effect_item_use")
    for (var i = 0; i < 20; i++) {
      bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, 40, 5, 18 * i, 80))
    }
  },
  shildAnuke = () => {
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "anuke Hull"))
    Sound_source_.playRandomSound("effect_item_use")
    player.shild = true
  },
  rainTnt = () => {
    let tnts = rand(2, 4)
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Rain Tnt"))
    Sound_source_.playRandomSound("effect_item_use")

    for (var i = 0; i < tnts; i++) {
      spawTnt()
    }
  },
  frozenEnemy = () => {
    if (Math.random() < 0.04) {
      particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "¿ Jojo reference ?"))
      Sound_source_.playSound("dio", 0)
    } else {
      particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Frozen Enemys"))

      Sound_source_.playRandomSound("effect_item_use")
    }
    enemyObject.forEach((enemy) => {
      enemy.static = 200 //20s
    })
  },
  MoreSpeedBullet = () => {
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Super Speed Bullet"))
    Sound_source_.playRandomSound("effect_item_use")
    playerUpgrades.speedBullet = playerUpgrades.speedBullet != playerUpgrades.max_speedBullet ? playerUpgrades.speedBullet + 5 : playerUpgrades.speedBullet
  }
  ]


// :/
let setDificulty = true
// spaw enemys
let interval_;
// timeOut 
let TimeOut;
// haddler timeOut
let TimeOut_active = false;
//set Spaw Enemy
let Interval = function() {
  interval_ = setInterval(() => {
    if (Math.random() * 100 < chace_power_up) powerUp();
    spawEnemy();
    if (Math.random() < 0.1 * (round / 10)) spawBig_juction();
  }, spawTime);
};




function game() {
  /* chace spaw enemy */
  if (points / 50 > counterEnemy || points < counterEnemy * 50) {
    points = -9999999999999999999999999999;
  } else if (points >= round * stat_dif) {
    if (spawTime > 800) {
      clearInterval(interval_);
      particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "More Enemys"));
      
      Sound_source_.playSound("next_round", 0);
     
      spawTime -= 50;
      stat_dif = Math.floor(stat_dif * 1.5);

      chace_power_up = chace_power_up * 1.2> 10 ? 10 : chace_power_up * 1.0;
      
        ++round;
      Interval();
    }
  }
  
  /* updage object */
  bulletsObject.forEach((bullet, indexBullet) => {
    bullet.update();

    if (bullet.x - bullet.radius > MAX_X_GAME) {
      removeObject(indexBullet, bulletsObject);
    };
    if (bullet.x + bullet.radius < 0) {
      removeObject(indexBullet, bulletsObject);
    };

    if (bullet.y - bullet.radius > MAX_Y_GAME) {
      removeObject(indexBullet, bulletsObject);
    };
    if (bullet.y + bullet.radius < 0) {
      removeObject(indexBullet, bulletsObject);
    };
    if (bullet.timeLife != null) {
      if (bullet.timeLife <= 0) {

        removeObject(indexBullet, bulletsObject);

      };
    };
  })

  powerUpObject.forEach((powerUp, indexPower) => {
    powerUp.update();

    if (powerUp.x - powerUp.radius > MAX_X_GAME) {
      removeObject(indexPower, powerUpObject);
    };
    if (powerUp.x + powerUp.radius < 0) {
      removeObject(indexPower, powerUpObject);
    };
    if (powerUp.y - powerUp.radius > MAX_Y_GAME) {
      removeObject(indexPower, powerUpObject);
    };
    if (powerUp.y + powerUp.radius < 0) {
      removeObject(indexPower, powerUpObject);
    };
  });
  
  enemyObject.forEach((enemy, index_enemy) => {
    enemy.update();
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);

    if (dist - enemy.radius - player.radius < 1) {
      player.hit();

    };
  })


  if (player.dead) {
    Sound_source_.playSound("dead", 2)
    clearInterval(interval_)
    UIConfig_.UIS[1].enable = false
    killAllEnemys()
    bulletsObject = []
    powerUpObject = []
    enemyObject = []
    particleObject.push(new particle(player.img, player.x, player.y, Math.random() * player.radius, Math.random() * 10, Math.random() * 360))

    TimeOut = setTimeout(() => {

      star_game = false
      TimeOut_active = true
      player.unDraw = true
      animatior.animations[2].enable = true

    }, 3000)

    if (TimeOut_active) {
      clearTimeout(TimeOut)

    }
  }
}
let atdead_particle = false

function animation() {
  requestAnimationFrame(animation)

  /*clear*/
  c.fillStyle = "rgba(255,255,255,0.3)"
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)
  particleObject.forEach((particle, index_particle) => {
    if (particle.alfa <= 0) {
      removeObject(index_particle, particleObject)
    } else {
      particle.update()
    }
  })


  if (star_game) {
    game()
  } else if (!player.dead && !star_game) {
    if (!animatior.animations[0].enable && !animatior.animations[0].finish) animatior.animations[0].enable = true
    if (animatior.animations[0].finish && !animatior.animations[1].finish) animatior.animations[1].enable = true
    if (animatior.animations[0].finish && animatior.animations[1].finish) {
      star_game = true
      UIConfig_.UIS[1].enable = true
      Interval()
    }
  }
  if (!player.unDraw) {
    player.update()
  } else {
    if (!atdead_particle) {
      for (let i = 0; i < 20; i++) {
        particleObject.push(new particle(player.img, player.x, player.y, Math.random() * player.radius, Math.random() * 10, Math.random() * 360))

      }
      atdead_particle = true

    }
    if (animatior.animations[2].finish && !animatior.animations[2].enable) {
      animatior.animations[3].enable = true
      UIConfig_.UIS[15].enable = true
    }
  }
  UIConfig_.drawAllUI()
  animatior.drawAllAnimation()
}

window.onload = () => {
  animation();
}

c.canvas.addEventListener("click", (event) => {
  event.preventDefault()
  if (star_game && !player.dead) {
    let angle = Math.atan2(event.clientY - c.canvas.height / 2, event.clientX - c.canvas.width / 2) * 180 / Math.PI;
    shotPlayer(angle)

    Sound_source_.playSound("shot", 1)
  } else if (!star_game) {
    animatior.animations[0].finish = true
  }
  if (player.dead && player.unDraw) {
    animatior.animations[2].finish = true
  }
  if (player.dead && player.unDraw && animatior.animations[2].finish && animatior.animations[3].enable) {
    resetGame()
  }

})