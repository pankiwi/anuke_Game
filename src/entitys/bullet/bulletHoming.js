/*
class BulletHoming extends Bullet {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img, speed, angle);
    this.pierce = true;
    this.targetIndex = null;
  };
  setTargetIndex() {
   let enemyArray = global.findObject('enemy');
   let target = Math.floor(Math.random() * enemyArray.length)
   if(enemyArray[target] && enemyArray[target].type === 'enemy'){
     this.targetIndex = target
   }
   
  };
  checkTarget() {
    let enemyArray = global.findObject('enemy');
    let enemy = enemyArray[this.targetIndex]

    if (enemy && enemy.type === 'enemy') {
      return true;
    } else {
      return false;
    }
  };
  update(ecene) {
    if (this.targetIndex === null) this.setTargetIndex();

    
    /** homing **//*
    if (this.checkTarget()) {
      let enemyArray = global.findObject('enemy');
      let enemy = enemyArray[this.targetIndex];
      
      let angleEnemy = MathFs.getAngle(enemy.x, this.x, enemy.y, this.y);
      
      let angle = Math.floor(this.angle * (180 / Math.PI));
      
      let newAngle = MathFs.lerpt(20, angle, angleEnemy)
      this.angle = MathFs.AngleToRadians(newAngle);
    } else {
      this.targetIndex = null;
    }
    
    super.update(ecene);
  };
  destroy(){
    super.destroy();
    this.targetIndex = null;
  }
  
}
/*
function SpawBulletHoming(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new BulletHoming(x, y, size, sprite, speed, angle));
}
*/

class BulletHoming extends Bullet {
  constructor(x, y, size, img, speed, angle) {
    super(x, y, size, img, speed, angle);
    this.pierce = true;
    this.targetIndex = null;
  };
  setTargetIndex() {
    for (var i = 0; i < global.ObjectGame.length; i++) {
      if(this.checkTarget(i)){
        this.targetIndex = i;
       break;
      };
    };
  };
  checkTarget(index) {
    let enemy = global.ObjectGame[index]

    if (enemy && enemy.type === 'enemy') {
      return true;
    } else {
      return false;
    };
  };
  update(ecene) {
    if (this.targetIndex === null) this.setTargetIndex();


    /** homing **/
    if (this.checkTarget(this.targetIndex)) {
      let enemy = global.ObjectGame[this.targetIndex];

      let angleEnemy = MathFs.getAngle(enemy.x, this.x, enemy.y, this.y);

      let angle = Math.floor(this.angle * (180 / Math.PI));

      let newAngle = MathFs.lerpt(20, angle, angleEnemy)
      this.angle = MathFs.AngleToRadians(newAngle);
    } else {
      this.targetIndex = null;
    }

    super.update(ecene);
  };
  destroy() {
    super.destroy();
    this.targetIndex = null;
  }

}

function SpawBulletHoming(x = 0, y = 0, size, sprite, speed, angle) {
  global.addObjectGame(new BulletHoming(x, y, size, sprite, speed, angle));
}