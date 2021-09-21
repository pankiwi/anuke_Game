class PlayerEntity {
  dead = false;
  shild = false;
  unDraw = false;
  constructor(x, y, img = new Image(),radius) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.radius = radius * radio_user;
    this.widthImg = (radius * 2) * radio_user;
  };
  hitBox() {;
    c.beginPath();
    c.fillStyle = 'lime';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fill();
  }
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
    if (this.shild) {
      c.drawImage(imgs.anuke_shild, 0, 0, imgs.anuke_shild.naturalWidth, imgs.anuke_shild.naturalHeight, this.x - (this.widthImg) / 2, this.y - (this.widthImg + 10), this.widthImg, this.widthImg);
    }
  }


  update() {
    this.draw();
    if (debug) {
      this.hitBox();
    };
  }
  hit() {
    if (this.shild) {
      killAllEnemys();
      this.shild = false;
      Sound_source_.playSound("hit", 0);
    } else {
      this.dead = true;
    };
  };
}


class enemy {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.radius = radius * radio_user;
    this.widthImg = (radius * 2) * radio_user;
    this.speed = speed;
    this.angle = angle * (Math.PI / 180);;
    //Freezen enemus
    this.static = 0;
  };
  hitBox() {
    c.beginPath()
    c.fillStyle = 'red';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
  };
  updateBullet() {
    if (!this.static > 0 || !pause_game) {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
    } else {
      this.static -= 0.5;
    };
  }
  update() {
    this.updateBullet();
    this.draw();
    if (debug) {
      this.hitBox();
    };
  };
  hit(index_enemy) {
    removeObject(index_enemy, enemyObject);
    counterEnemy++;
    points = points + 50;
    atParticleRandom(this.x,this.y,this.img,10,20,1,15,rand(5,10));
  };
};
class frag_enemy extends enemy{
  constructor(img, x, y, radius, speed, angle) {
    super(img,x,y,radius,speed,angle);
  }
  hit(index_enemy) {
    removeObject(index_enemy, enemyObject);
    let dropEnemy = rand(2,3);
    counterEnemy++;
    points = points + 50;
    atParticleRandom(this.x,this.y,this.img,10,20,1,15,rand(5,10));
    for(let i = 0;i < dropEnemy;i++){
      let x,y,radius,angle,speed;
      radius = this.widthImg/2 + Math.random() * this.widthImg/2.5;
      x = this.x + rand(-this.radius,this.radius);
      y = this.y + rand(-this.radius,this.radius);
      angle = getAnglePlayer(x,y);
      speed = this.speed/2 + rand(-this.speed/4,this.speed/4);
      enemyObject.push( new enemy(this.img,x,y,radius,speed,angle));
    };
  };
};
class box_power_up {
  constructor(x, y, angle, radius, speed) {
    this.img = imgs.router_big
    this.x = x
    this.y = y
    this.radius = radius * radio_user
    this.widthImg = (radius * 2) * radio_user
    this.speed = speed
    this.angle = angle * (Math.PI / 180);
  }
  hitBox() {
    c.beginPath();
    c.fillStyle = 'greend';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
  };
  updateBullet() {
    if(!pause_game){
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    }
  };
  update() {
    this.updateBullet();
    this.draw();
    if (debug) {
      this.hitBox();
    };
  };
  hit(index_enemy) {
    removeObject(index_enemy, powerUpObject);
    power_ups[rand(0,power_ups.length)]();
    atParticleRandom(this.x,this.y,this.img,10,20,1,15,rand(5,10));
  };
};

class tnt_router {
  txt = ["bang", "boomb", "pow", "router's"];
  constructor(x, y, angle,radius,speed) {
    this.img = imgs.tnt_router;
    this.x = x;
    this.y = y;
    this.radius =  radius * radio_user;
    this.widthImg = (radius * 2) * radio_user;
    this.speed = speed;
    this.angle = angle * (Math.PI / 180);
  }
  hitBox() {
    c.beginPath();
    c.fillStyle = 'greend';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
  };
  updateBullet() {
    if(!pause_game){
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    }
  };
  update() {
    this.updateBullet();
    this.draw();
    if (debug) {
      this.hitBox();
    };
  };
  hit(index_enemy) {
    removeObject(index_enemy, powerUpObject);
   atParticleRandom(this.x,this.y,this.img,10,20,1,15,rand(5,10)); 
    particleObject.push(new particle_txt(this.x, this.y, 100, 1, Math.random() * 360, txt[rand(0,txt.length)]));
    Sound_source_.playRandomSound("hit")
    for (var i = 0; i < 10; i++) {;
      bulletsObject.push(new bullet(imgs.router, this.x, this.y,40,3, 36 * i, 40));
    };
  };
};

class particle {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.radius = radius * radio_user;
    this.widthImg = (radius * 2) * radio_user;
    this.speed = speed;
    this.angle = angle * (Math.PI / 180);
    this.alfa = 1;
  };
  draw() {
    c.save();
    c.globalAlpha = this.alfa;
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
    c.restore();
  };
  updateBullet() {
    if(!pause_game){
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alfa = this.alfa - 0.03 > 0 ? this.alfa - 0.03 : 0;
    }
  };
  update() {
    this.updateBullet();
    this.draw();
  };
};

class particle_txt extends particle {
  constructor(x, y, radius, speed, angle, txt) {
    super(null, x, y, radius, speed, angle);
    this.txt = txt;
  };
  draw() {
    drawTxtChaceWidth(c, this.x, this.y, this.radius, this.radius, "black", this.txt, "center", this.alfa);
  };
};

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