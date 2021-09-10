class PlayerEntity {
  dead = false
  constructor(x,y,img = new Image(), widthImg, radius) {
    this.x = x
    this.y = y
    this.img = img
    this.radius = radius
    this.widthImg = widthImg
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'lime'
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {
    c.drawImage(this.img,0,0,this.img.naturalWidth,this.img.naturalHeight,this.x - this.widthImg/2,this.y - this.widthImg/2,this.widthImg,this.widthImg)
  }


  update() {

    this.draw()
    if (debug) {
      this.hitBox()
    }

  }

}


class enemy {
  constructor(img, x, y, radius, speed, angle, widthImg) {
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
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg)
  }
  updateBullet() {
    let angle = this.angle * (Math.PI / 180)
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
  hit(index_enemy) {
    counterEnemy++
    points = points  + Math.floor(Math.random() * (100 + this.radius * 2))
    removeObject(index_enemy,enemyObject)
  //  removeObject(index_bullet, bulletsObject)
  }
}