function spawEnemyBasic(this_) {
  let enemy = { x: 0, y: 0, size: 0, speed: 0, angle: 0 };
  enemy.size = MathFs.randFloat(100, 150)

  if (Math.random() < 0.5) {
    enemy.x = Math.random() < 0.5 ? 0 - enemy.size : this_.gameWidth + enemy.size;
    enemy.y = Math.random() * this_.gameHeight;
  } else {
    enemy.y = Math.random() < 0.5 ? 0 - enemy.size : this_.gameHeight + enemy.size;
    enemy.x = Math.random() * this_.gameWidth;
  };

  enemy.angle = MathFs.getAngle(this_.gameWidth / 2, enemy.x, this_.gameHeight / 2, enemy.y);
  enemy.speed = Math.abs(10 - enemy.size / 15) + Math.random();
  enemy.speed = enemy.speed < 1 ? 1 : enemy.speed;
  SpawEnemy(enemy.x, enemy.y, enemy.size, this_.sprites.anuke, enemy.speed, enemy.angle);

};