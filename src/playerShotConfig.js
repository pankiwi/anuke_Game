class playerShotConfig {
  bullets = [];
  constructor() {};
  addBullet(bulletType = {
    type: new EntityMove(),
    chanceShot: 0,
    shot: function(x, y, rotation, vel) {
      this.type.at(x, y, rotation, vel);
    }
  }) {
    let bullet = {
      type: new EntityMove(),
      chanceShot: 0,
      shot: function(x, y, rotation, vel) {
        this.type.at(x, y, rotation, vel);
      }
    }
    Object.assign(bullet, bulletType)
    this.bullets.push(bullet);
    this.bullets.sort((a, b) => {
      if (a.chanceShot < b.chanceShot) return -1
    })
  }
  atShot(x, y, rotation, vel) {
    for (var prop in this.bullets) {
      if (Math.random() * 100 < (this.bullets[prop].chanceShot * 100)) {
        this.bullets[prop].shot(x, y, rotation, vel);
        break;
      }
    }
  }
}