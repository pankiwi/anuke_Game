

class bullet {
 constructor(img,x, y, radius, speed, angle, widthImg) {
  this.img = img
  this.x = x
  this.y = y
  this.radius = radius
  this.widthImg = widthImg
  this.speed = speed
  this.angle = angle
  
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'red'
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  c.drawImage(this.img ,0,0,this.img.naturalWidth,this.img.naturalHeight,this.x - this.widthImg/2,this.y - this.widthImg/2,this.widthImg,this.widthImg)
 }
 updateBullet(){
  let angle = this.angle * (Math.PI/180)
  this.x += Math.cos(angle) * this.speed
  this.y += Math.sin(angle) * this.speed 
 }
 update() {
  this.updateBullet()
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }
 hit(index_bullet,enemy,index_enemy){
   
  enemy.hit(index_enemy)
  removeObject(index_bullet,bulletsObject)
 }
}