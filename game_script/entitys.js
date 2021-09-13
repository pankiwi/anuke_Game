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
    for(let i = 0;i< Math.random() * 8 + 5;i++){
      particleObject.push( new particle(this.img,this.x,this.y,Math.random() * 10+5,Math.random() * 10,Math.random() * 360))
    }
    removeObject(index_enemy,enemyObject)
  //  removeObject(index_bullet, bulletsObject)
  }
}

class particle {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img
    this.x = x
    this.y = y
    this.radius = radius
    this.widthImg = radius * 2
    this.speed = speed
    this.angle = angle
    this.alfa = 1
  }
  draw() {
    c.save()
    c.globalAlpha = this.alfa
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg)
    c.restore()
  }
  updateBullet() {
    let angle = this.angle * (Math.PI / 180)
    this.x += Math.cos(angle) * this.speed
    this.y += Math.sin(angle) * this.speed
    this.alfa -= 0.01
  }
  update() {
    this.updateBullet()
    this.draw()
  }
}

class cicle {
  constructor(x,y,radius) {
    this.x = x
    this.y = y
    this.radius = radius
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'lime'
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {
    c.beginPath()
    c.fillStyle = 'lime'
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
  }


  update() {

    this.draw()
    if (debug) {
      this.hitBox()
    }

  }
  setCoords(x,y){
    this.x = x
    this.y = y
  }

}
