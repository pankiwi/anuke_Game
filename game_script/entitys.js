class PlayerEntity {
  dead = false
  shild = false
  unDraw = false
  constructor(x, y, img = new Image(), widthImg, radius) {
    this.x = x
    this.y = y
    this.img = img
    this.radius = radius * radio_user
    this.widthImg = widthImg * radio_user
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'lime'
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg)
    if (this.shild) {
      c.drawImage(imgs.anuke_shild, 0, 0, imgs.anuke_shild.naturalWidth, imgs.anuke_shild.naturalHeight, this.x - (this.widthImg) / 2, this.y - (this.widthImg + 10), this.widthImg, this.widthImg)
    }
  }


  update() {

    this.draw()
    if (debug) {
      this.hitBox()
    }

  }
  hit() {
    if (this.shild) {
      killAllEnemys()
      this.shild = false
      Sound_source_.playSound("hit", 0)
    } else {
      this.dead = true
    }
  }
}


class enemy {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img
    this.x = x
    this.y = y
    this.radius = radius * radio_user
    this.widthImg = (radius * 2) * radio_user
    this.speed = speed
    this.angle = angle
    this.static = 0
    
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
    if (!this.static > 0) {
      let angle = this.angle * (Math.PI / 180)
      this.x += Math.cos(angle) * this.speed
      this.y += Math.sin(angle) * this.speed
    } else {
      this.static -= 0.5
    }
  }
  update() {
    this.ang = ++this.ang % 360
    this.updateBullet()


    this.draw()
    if (debug) {
      this.hitBox()
    }

  }
  hit(index_enemy) {
    counterEnemy++
    points = points + 50
    for (let i = 0; i < Math.random() * 8 + 5; i++) {
      particleObject.push(new particle(this.img, this.x, this.y, Math.random() * 20 + 5, Math.random() * 10, Math.random() * 360))
    }
    removeObject(index_enemy, enemyObject)
    //  removeObject(index_bullet, bulletsObject)
  }
}
class frag_enemy extends enemy{
  constructor(img, x, y, radius, speed, angle) {
    super(img,x,y,radius,speed,angle)
  }
  hit(index_enemy) {
    let dropEnemy = rand(2,3)
    counterEnemy++
    points = points + 50
    for (let i = 0; i < Math.random() * 8 + 5; i++) {
      particleObject.push(new particle(this.img, this.x, this.y, Math.random() * 20 + 5, Math.random() * 10, Math.random() * 360))
    }
    for(let i = 0;i < dropEnemy;i++){
      let x,y,radius,angle,speed
      radius = this.widthImg/2 + Math.random() * this.widthImg/2.5
      x = this.x + rand(-this.radius,this.radius)
      y = this.y + rand(-this.radius,this.radius)
      angle = getAnglePlayer(x,y)
      speed = this.speed/2 + rand(-this.speed/4,this.speed/4)
      enemyObject.push( new enemy(this.img,x,y,radius,speed,angle))
    }
    removeObject(index_enemy, enemyObject)
    //  removeObject(index_bullet, bulletsObject)
  }
}
class box_power_up {
  constructor(x, y, angle) {
    this.img = imgs.router_big
    this.x = x
    this.y = y
    this.radius = 120 * radio_user
    this.widthImg = (120 * 2) * radio_user
    this.speed = 4
    this.angle = angle
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'greend'
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
    this.draw()
    if (debug) {
      this.hitBox()
    }

  }
  hit(index_enemy) {

    for (let i = 0; i < Math.random() * 8 + 5; i++) {
      particleObject.push(new particle(this.img, this.x, this.y, Math.random() * 20 + 5, Math.random() * 10, Math.random() * 360))
    }
    power_ups[Math.floor(Math.random() * power_ups.length)]()
  //  power_ups[3]()
    removeObject(index_enemy, powerUpObject)
    //  removeObject(index_bullet, bulletsObject)
  }
}

class tnt_router {
  constructor(x, y, angle) {
    this.img = imgs.tnt_router
    this.x = x
    this.y = y
    this.radius = 100 * radio_user
    this.widthImg = (this.radius * 2) * radio_user
    this.speed = 3
    this.angle = angle
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'greend'
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
    this.draw()
    if (debug) {
      this.hitBox()
    }

  }
  hit(index_enemy) {

    let txt = ["bang", "boomb", "pow", "router's"]
    for (let i = 0; i < Math.random() * 8 + 5; i++) {
      particleObject.push(new particle(this.img, this.x, this.y, Math.random() * 30 + 5, Math.random() * 10, Math.random() * 360))
    }
    particleObject.push(new particle_txt(this.x, this.y, 70, 1, Math.random() * 360, txt[Math.floor(Math.random() * txt.length)]))
    Sound_source_.playRandomSound("effect_item_use")
    for (var i = 0; i < 20; i++) {
      bulletsObject.push(new bullet(imgs.router, this.x, this.y, 20, 5, 18 * i, 40))
    }
    removeObject(index_enemy, powerUpObject)
    //  removeObject(index_bullet, bulletsObject)
  }
}

class particle {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img
    this.x = x
    this.y = y
    this.radius = radius * radio_user
    this.widthImg = (radius * 2) * radio_user
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

class particle_txt extends particle {
  constructor(x, y, radius, speed, angle, txt) {
    super(null, x, y, radius, speed, angle)
    this.txt = txt
  }
  draw() {
    drawTxtChaceWidth(c, this.x, this.y, this.radius, this.radius, "black", this.txt, "center", this.alfa)
  }
}

class cicle {
  constructor(x, y, radius) {
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
  setCoords(x, y) {
    this.x = x
    this.y = y
  }

}