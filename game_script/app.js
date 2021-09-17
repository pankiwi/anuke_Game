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
    let tnts = rand(3, 5)
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Rain Tnt"))
    Sound_source_.playRandomSound("effect_item_use")
    
    for (var i = 0; i < tnts; i++) {
      spawTnt()
    }
  },
  frozenEnemy = () => {
    if(Math.random() < 0.05){
      particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "¿ Jojo reference ?"))
      Sound_source_.playSound("dio",0)
    }else{
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Frozen Enemys"))
    
    Sound_source_.playRandomSound("effect_item_use")
    }
    enemyObject.forEach((enemy) => {
      enemy.static = 100 //10s
    })
  },
  MoreSpeedBullet = () => {
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "Super Speed Bullet"))
    Sound_source_.playRandomSound("effect_item_use")
    playerUpgrades.speedBullet = playerUpgrades.speedBullet != playerUpgrades.max_speedBullet ? playerUpgrades.speedBullet + 5 : playerUpgrades.speedBullet
  }
  ]

function killAllEnemys() {
  enemyObject.forEach((enemy, index) => {
    enemy.hit(index)
  })
}

function getAnglePlayer(x,y) {
  return Math.atan2(MAX_Y_GAME / 2 - y, MAX_X_GAME / 2 - x) * 180 / Math.PI
}

function resize_canvas() {
  if (c.canvas.height < window.innerHeight)
  {
    if (window.innerHeight > 4700) {
      c.canvas.height = 4700
      c.canvas.width = 4000
      c.canvas.classList.add("canvas_outLine")
    } else if (window.innerHeight > 3700) {
      c.canvas.height = 3700
      c.canvas.width = 3000
      c.canvas.classList.add("canvas_outLine")
    } else if (window.innerHeight > 2700) {
      c.canvas.height = 2700
      c.canvas.width = 2000
      c.canvas.classList.add("canvas_outLine")
    } else if (window.innerHeight < 1700) {
      c.canvas.height = 1700
      c.canvas.width = 1000
      c.canvas.classList.add("canvas_outLine")
    }


  }

  MAX_X_GAME = c.canvas.width
  MAX_Y_GAME = c.canvas.height
  radio_user = MAX_X_GAME / MAX_Y_GAME

}
function shotPlayer(angle) {
  if(Math.random() < 0.3 && playerUpgrades.phaserBullet){
    bulletsObject.push(new phser_bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, playerUpgrades.radiusBullet, playerUpgrades.speedBullet, angle))
  }else{
    bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, playerUpgrades.radiusBullet, playerUpgrades.speedBullet, angle))
  }
}
function resetGame() {
  enemyObject = []
  bulletsObject = []
  powerUpObject = []
  playerUpgrades = {
    speedBullet: 15,
    radiusBullet: 20,
    max_speedBullet: 40,
    max_radiusBullet: 60,
    phaserBullet: false
  }
  points = 0
  counterEnemy = 0
  round = 1
  stat_dif = 500
  spawTime = 2000
  TimeOut_active = false
  atdead_particle = false
  animatior.animations.forEach((animation_) => {
    animation_.enable = false
    animation_.finish = false
    animation_.i = 0
  })
  UIConfig_.UIS.forEach((ui_) => {
    ui_.enable = false
  })
  player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60)
  animatior.animations[0].finish = true
}
const c = document.querySelector("canvas").getContext("2d")

let MAX_X_GAME = 0
let MAX_Y_GAME = 0
let radio_user = 0
let star_game = false
let debug = false
let points = 0
let bulletsObject = []
let particleObject = []
let enemyObject = []
let powerUpObject = []
let counterEnemy = 0
let round = 1
let stat_dif = 500
let spawTime = 2000
resize_canvas()
let buffer_output_ratio = 1
let bounding_rectangle = c.canvas.getBoundingClientRect();
let player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60)
let playerUpgrades = {
  speedBullet: 15,
  radiusBullet: 20,
  max_speedBullet: 40,
  max_radiusBullet:60,
  phaserBullet: false
}
//by Skatnext
// rand: devuelve un numero random entre el primer y el segudo parametro



function rand(min, max) {
  const argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) { throw new Error('Warning: rand() expects exactly 2 parameters, 1 given'); }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawTnt() {
  let x, y, angle

  if (Math.random() > 0.5) {
    if (Math.random() < 0.5) {
      y = Math.random() * MAX_Y_GAME
      x = 0
      angle = 360
    } else {
      y = Math.random() * MAX_Y_GAME
      x = MAX_X_GAME
      angle = 180
    }
  } else {
    if (Math.random() < 0.5) {
      y = 0
      x = Math.random() * MAX_X_GAME
      angle = 90

    } else {
      y = MAX_Y_GAME
      x = Math.random() * MAX_X_GAME
      angle = 270


    }
  }
  powerUpObject.push(new tnt_router(x, y, angle))
}

function spawEnemy() {
  if (enemyObject.length <= 15) {
    
    let x, y, radiusEnemy, speed, angle
    radiusEnemy = rand(40, 70)
    
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_X_GAME + radiusEnemy
      y = Math.random() * MAX_Y_GAME
    } else {
      y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME + radiusEnemy
      x = Math.random() * MAX_X_GAME
    }

    angle = getAnglePlayer(x,y)
    speed = Math.abs(Math.floor(10 - radiusEnemy / 10) + rand(-1, 1))
    enemyObject.push(new enemy(imgs.juction, x, y, radiusEnemy, speed, angle))
    
  }
}

function spawBig_juction(){
  if (enemyObject.length <= 15) {
  
    let x, y, radiusEnemy, speed, angle
    radiusEnemy = rand(70, 80)
  
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_X_GAME + radiusEnemy
      y = Math.random() * MAX_Y_GAME
    } else {
      y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME + radiusEnemy
      x = Math.random() * MAX_X_GAME
    }
  
    angle = getAnglePlayer(x, y)
    speed = Math.abs(Math.floor(10 - radiusEnemy / 10) + rand(-1, 1))
    enemyObject.push(new frag_enemy(imgs.juction, x, y, radiusEnemy, speed, angle))
  
  }
}

function powerUp() {
  if (powerUpObject.length < 2) {
    let x, y, angle


    if (Math.random() > 0.5) {
      if (Math.random() < 0.5) {
        y = Math.random() * MAX_Y_GAME
        x = 0
        angle = 360
      } else {
        y = Math.random() * MAX_Y_GAME
        x = MAX_X_GAME
        angle = 180
      }
    } else {
      if (Math.random() < 0.5) {
        y = 0
        x = Math.random() * MAX_X_GAME
        angle = 90
    
      } else {
        y = MAX_Y_GAME
        x = Math.random() * MAX_X_GAME
        angle = 270
    
    
      }
    }

    powerUpObject.push(new box_power_up(x, y, angle))
  }

}


let interval_
let TimeOut
let TimeOut_active = false
let Interval = function() {
  interval_ = setInterval(() => {
    setDificulty = true
    let rand1
    rand1 = Math.random()

  if (rand1 > 0.9) powerUp()
    //spawTnt()
  spawEnemy()
  if(Math.random() < 0.1) spawBig_juction()
  }, spawTime)
}

function removeObject(index, array = []) {
  array.splice(index, 1)
}
let setDificulty = true
function game() {
  if(points/50 > counterEnemy){
    window.location.replace('https://youtu.be/dQw4w9WgXcQ')
  }else if(points >= round * stat_dif && setDificulty){
    setDificulty = false
    if(spawTime > 1000){
    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3.6, 100, 1, 270, "More dificulty"))
    clearInterval(interval_)
    spawTime -= 50
    stat_dif =  Math.floor(stat_dif * 1.4)
    ++round
    Interval()
//    particleObject.push(new particle_txt(MAX_X_GAME / 2, MAX_Y_GAME / 3, 100, 1, 270, "" + spawTime + "-" + interval_ + "--" + round * stat_dif))
    }
  }
  bulletsObject.forEach((bullet, indexBullet) => {
    bullet.update()

    if (bullet.x - bullet.radius > MAX_X_GAME) {
      removeObject(indexBullet, bulletsObject)
    }
    if (bullet.x + bullet.radius < 0) {
      removeObject(indexBullet, bulletsObject)
    }

    if (bullet.y - bullet.radius > MAX_Y_GAME) {
      removeObject(indexBullet, bulletsObject)
    }
    if (bullet.y + bullet.radius < 0) {
      removeObject(indexBullet, bulletsObject)
    }

    if (bullet.timeLife != null) {
      if (bullet.timeLife <= 0) {

        removeObject(indexBullet, bulletsObject)

      }
    }
  })

  powerUpObject.forEach((powerUp, indexPower) => {
    powerUp.update()

    if (powerUp.x - powerUp.radius > MAX_X_GAME) {
      removeObject(indexPower, powerUpObject)
    }
    if (powerUp.x + powerUp.radius < 0) {
      removeObject(indexPower, powerUpObject)
    }

    if (powerUp.y - powerUp.radius > MAX_Y_GAME) {
      removeObject(indexPower, powerUpObject)
    }
    if (powerUp.y + powerUp.radius < 0) {
      removeObject(indexPower, powerUpObject)
    }

    bulletsObject.forEach((bullet_, index_bullet) => {
      const dist = Math.hypot(bullet_.x - powerUp.x, bullet_.y - powerUp.y)

      if (dist - powerUp.radius - powerUp.radius < 1) {
        bullet_.hit(index_bullet, powerUp, indexPower)
      }
    })
  })
  enemyObject.forEach((enemy, index_enemy) => {
    enemy.update()
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if (dist - enemy.radius - player.radius < 1) {
      player.hit()

    }

    bulletsObject.forEach((bullet_, index_bullet) => {
      const dist = Math.hypot(bullet_.x - enemy.x, bullet_.y - enemy.y)

      if (dist - enemy.radius - bullet_.radius < 1) {
        bullet_.hit(index_bullet, enemy, index_enemy)
      }
    })
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
  c.fillStyle = "rgba(255,255,255,0.3"
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
    let angle = Math.atan2(event.clientY - innerHeight / 2, event.clientX - innerWidth / 2) * 180 / Math.PI;
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