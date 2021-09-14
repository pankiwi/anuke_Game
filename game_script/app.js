function resize_canvas() {
  if (c.canvas.height < window.innerHeight)
  {
    c.canvas.height = window.innerHeight;
  }

  if (c.canvas.width < window.innerWidth)
  {
    c.canvas.width = window.innerWidth;
  }
  MAX_X_GAME = c.canvas.width
  MAX_Y_GAME = c.canvas.height
  radio_user = MAX_X_GAME/MAX_Y_GAME
  
}

const c = document.querySelector("canvas").getContext("2d")

let MAX_X_GAME = 0
let MAX_Y_GAME = 0
let radio_user = 0
let star_game = false
let debug = true
let points = 0
let bulletsObject = []
let particleObject = []
let enemyObject = []
let counterEnemy = 0
let round = 1
let stat_dif = 10
let spawTime = 2000
let enemys = 0
resize_canvas()
let buffer_output_ratio = 1 
let bounding_rectangle = c.canvas.getBoundingClientRect();
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


function spawEnemy() {
  let x, y, radiusEnemy, speed, angle
  radiusEnemy = rand(40,60)

  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_X_GAME + radiusEnemy
    y = Math.random() * MAX_Y_GAME
  } else {
    y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME + radiusEnemy
    x = Math.random() * MAX_X_GAME
  }

  angle = Math.atan2(MAX_Y_GAME / 2 - y, MAX_X_GAME / 2 - x) * 180 / Math.PI
  speed = Math.floor(10 - radiusEnemy / 10) + rand(-2,2)
  enemyObject.push(new enemy(imgs.juction, x, y, radiusEnemy, speed, angle, radiusEnemy * 2))
  enemys++
}




let interval_
let TimeOut
let TimeOut_active = false
let Interval = function() {
  interval_ = setInterval(() => {
    spawEnemy()
  }, spawTime)
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
      player.hit()

    }

    bulletsObject.forEach((bullet_, index_bullet) => {
      const dist = Math.hypot(bullet_.x - enemy.x, bullet_.y - enemy.y)

      if (dist - enemy.radius - bullet_.radius < 1) {
        bullet_.hit(index_bullet, enemy, index_enemy)
      }
    })
  })

  
  if(player.dead){
      Sound_source_.playSound("dead",1)
        clearInterval(interval_)
        UIConfig_.UIS[1].enable = false
        enemyObject.forEach((enemy, index) => {
          enemy.hit(index)
        })
        
        particleObject.push(new particle(player.img,player.x,player.y,Math.random() * player.radius,Math.random() * 10,Math.random() * 360))

       TimeOut =  setTimeout(() => {
          animatior.animations[2].enable = true
          star_game = false
          TimeOut_active = true
          player.unDraw  = true
        },3000)
        
        if(TimeOut_active){
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
  } else if(!player.dead && !star_game){
    if (!animatior.animations[0].enable && !animatior.animations[0].finish) animatior.animations[0].enable = true
    if (animatior.animations[0].finish && !animatior.animations[1].finish) animatior.animations[1].enable = true
    if (animatior.animations[0].finish && animatior.animations[1].finish) {
      star_game = true
      UIConfig_.UIS[1].enable = true
      Interval()
    }
  }
  if(!player.unDraw){
  player.update()
  }else{
    if(!atdead_particle){
    for(let i = 0; i < 20;i++){
      particleObject.push(new particle(player.img,player.x,player.y,Math.random() * player.radius,Math.random() * 10,Math.random() * 360))
      
    }
    atdead_particle = true
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
    
    bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, 10, 15, angle, 30))
    Sound_source_.playSound("shot",1)
  } else {
    animatior.animations[0].finish = true
  }
  
})

