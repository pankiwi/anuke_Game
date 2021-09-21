class bullet {
  constructor(img, x, y, radius, speed, angle) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.radius = radius * radio_user;
    this.widthImg = (radius * 2) * radio_user;
    this.speed = speed;
    this.angle = angle * (Math.PI / 180);
    this.timeLife = null;
  };
  hitBox() {
    c.beginPath();
    c.fillStyle = 'red';
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };
  draw() {
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
  };
  updateBullet() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  };
  update() {
    this.updateBullet();
    this.draw();
    if (debug) {
      this.hitBox();
    };
  };
  hit(index_bullet, enemy, index_enemy) {
    enemy.hit(index_enemy);
    removeObject(index_bullet, bulletsObject);
  };
};

class phser_bullet extends bullet {
  constructor(img, x, y, radius, speed, angle) {
    super(img, x, y, radius, speed, angle);
  };
  draw() {
    c.save();
    c.globalAlpha = 0.5;
    c.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight, this.x - this.widthImg / 2, this.y - this.widthImg / 2, this.widthImg, this.widthImg);
    c.restore();
  };
  hit(index_bullet, enemy, index_enemy) {
    enemy.hit(index_enemy);
  };
}