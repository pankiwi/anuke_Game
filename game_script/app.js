const c = document.querySelector("canvas").getContext("2d")

let MAX_X_GAME = c.canvas.width
let MAX_Y_GAME = c.canvas.height
let star_game = false
let debug = false
let points = 0
let bulletsObject = []
let particleObject = []
let enemyObject = []
let counterEnemy = 0
let round = 1
let stat_dif = 10
let spawTime = 2000
let enemys = 0
let client_screend_radius_x = (MAX_X_GAME / innerWidth)
let client_screend_radius_y = (MAX_Y_GAME / innerHeight)
const player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60)

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


function removeObject(index, array = []) {
  array.splice(index, 1)
}

function game() {
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
  })
  enemyObject.forEach((enemy, index_enemy) => {
    enemy.update()
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

    if (dist - enemy.radius - player.radius < 1) {
      player.dead = true

    }

    bulletsObject.forEach((bullet_, index_bullet) => {
      const dist = Math.hypot(bullet_.x - enemy.x, bullet_.y - enemy.y)

      if (dist - enemy.radius - bullet_.radius < 1) {
        bullet_.hit(index_bullet, enemy, index_enemy)
      }
    })
  })

  particleObject.forEach((particle, index_particle) => {
    if (particle.alfa <= 0) {
      removeObject(index_particle, particleObject)
    } else {
      particle.update()
    }
  })
}

function animation() {
  requestAnimationFrame(animation)

  /*clear*/
  c.fillStyle = "rgba(255,255,255,0.3"
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)
  if (star_game) {
    game()
  } else {
    if (!animatior.animations[0].enable && !animatior.animations[0].finish) animatior.animations[0].enable = true
    if (animatior.animations[0].finish && !animatior.animations[1].finish) animatior.animations[1].enable = true
    if (animatior.animations[0].finish && animatior.animations[1].finish) {
      star_game = true
      UIConfig_.UIS[1].enable = true
      //    Interval()
    }
  }
  player.update()
  UIConfig_.drawAllUI()
  animatior.drawAllAnimation()
}

window.onload = () => {
  animation();
}

c.canvas.addEventListener("click", (event) => {
  event.preventDefault()
  if (star_game) {
    let angle = Math.atan2(event.clientY - innerHeight / 2, event.clientX - innerWidth / 2) * 180 / Math.PI;

    bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, 10, 15, angle, 30))
  } else {
    animatior.animations[0].finish = true
  }
})