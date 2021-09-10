const c = document.querySelector("canvas").getContext("2d")

c.canvas.width = innerWidth
c.canvas.height = innerHeight

const MAX_X_GAME = c.canvas.width
const MAX_Y_GAME = c.canvas.height
let star_game = false
let debug = false
let points = 0
let bulletsObject = [ ]
let particleObject = []
let enemyObject = []
let spawTime =  2000
let counterEnemy = 0
const player = new PlayerEntity(MAX_X_GAME/2,MAX_Y_GAME/2,imgs.anuke,100,60)
/*
snip
new enemy_snip(300,100,10,1,0.1,1, new IA_Snipfra(100),{damage:1,speed:3,randx:0,randy:15,radius:5},imgs.enemy[4],true,{frameSpeed:20,frames:3,width:30})
*/
function spawEnemy() {
 setInterval(() => {
   let x,y
   let radiusEnemy = Math.floor(Math.random() * 60)
   radiusEnemy = radiusEnemy < 30? 30 : radiusEnemy
   
   if(Math.random() < 0.5){
     x = Math.random() < 0.5?0 - radiusEnemy: MAX_X_GAME + radiusEnemy
     y= Math.random() * MAX_Y_GAME 
   }else{
     y = Math.random() < 0.5 ? 0 - radiusEnemy : MAX_Y_GAME  + radiusEnemy
     x = Math.random() * MAX_X_GAME
   }
   
   let angle = Math.atan2(MAX_Y_GAME / 2 - y, MAX_X_GAME / 2 - x) * 180 / Math.PI;
   enemyObject.push(new enemy(imgs.juction,x,y,radiusEnemy,4,angle,radiusEnemy*2))
 },spawTime)
}

function removeObject(index, array = []) {
  array.splice(index, 1)
}

function game() {
  try{
  if (star_game) {
    bulletsObject.forEach((bullet, indexBullet) => {
      bullet.update()
      
      if(bullet.x - bullet.radius > MAX_X_GAME){
        removeObject(indexBullet,bulletsObject)
      }
      if(bullet.x + bullet.radius < 0){
        removeObject(indexBullet,bulletsObject)
      }
      
      if (bullet.y - bullet.radius > MAX_Y_GAME) {
        removeObject(indexBullet, bulletsObject)
      }
      if (bullet.y + bullet.radius < 0) {
        removeObject(indexBullet, bulletsObject)
      }
    })
    enemyObject.forEach((enemy,index_enemy) => {
      enemy.update()
      const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
      
      if (dist - enemy.radius - player.radius < 1) {
        player.dead = true
        
      }
      
      bulletsObject.forEach((bullet_,index_bullet) => {
        const dist = Math.hypot(bullet_.x - enemy.x, bullet_.y - enemy.y)
        
        if (dist - enemy.radius - bullet_.radius < 1) {
          bullet_.hit(index_bullet,enemy,index_enemy)
        }
      })
    })
    
   
    /**/
  }
  }catch(e){
    console.log(e)
  }
}
let time = 150
let i = 0
let animationUI = [UIConfig_.UIS[2],UIConfig_.UIS[3],UIConfig_.UIS[4],UIConfig_.UIS[5],UIConfig_.UIS[6],UIConfig_.UIS[7],UIConfig_.UIS[8],UIConfig_.UIS[9],UIConfig_.UIS[10],UIConfig_.UIS[11]]
function animation() {
  requestAnimationFrame(animation)
  
  /*clear*/
  c.fillStyle = "rgba(255,255,255,0.3"
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)
 if(star_game){
 game()
 }else{
   time += 1
   if(time >= 150){
     time = 0
     
     if(animationUI[i]){
     animationUI[i].enable = true
     }
     if(animationUI[i - 1]){
     animationUI[i - 1].enable = false
     }
     i++
     if(i >= animationUI.length){
       star_game = true
       spawEnemy()
       UIConfig_.UIS[1].enable = true
       animationUI.forEach((ui) => {
         ui.enable = false
       })
     }
   }
 }
 player.update()
  /*draw UI*/
  drawTxt(c, c.canvas.width / 2, c.canvas.height / 2, 200, 50, "black", time + "/" + i, "left", 1)
//player.update()
  UIConfig_.drawAllUI()

}  

window.onload = () => {
  animation();
//  spawEnemy()
}

c.canvas.addEventListener("click",(event) => {
  event.preventDefault()
if(star_game){
 Sound_source_.playSound("shot",1)
  let angle = Math.atan2(event.clientY - MAX_Y_GAME / 2, event.clientX - MAX_X_GAME / 2) * 180 / Math.PI;
  
  bulletsObject.push(new bullet(imgs.router, MAX_X_GAME / 2, MAX_Y_GAME / 2, 10, 6, angle, 30))
}else{
  i = animationUI.length
}
})

