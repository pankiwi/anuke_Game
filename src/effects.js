let effects = {
  none: new effect(0.1, (x, y, rotation, data, this_) => {
    //TODO
  }),
  explotionEntity: new effect(0.1, (x, y, rotation, data, this_) => {
    for (let i = 0; i < MathFs.randFloat(5, 8); i++) {
      let particle = new Particle({
        size: MathFs.randFloat(20, data.getSize() / 2),
        img: data.img,
        speed: MathFs.randFloat(100, 200),
        hasAlfa: true,
        lifeTime: this_.time
      });

      particle.at(x, y, MathFs.randFloat(0, 360));
    }
  }),
  explotionEntitySmall: new effect(0.1, (x, y, rotation, data, this_) => {
    for (let i = 0; i < MathFs.randFloat(1, 3); i++) {
      let particle = new Particle({
        size: MathFs.randFloat(5, data.getSize() / 2),
        img: data.img,
        speed: MathFs.randFloat(100, 200),
        hasAlfa: true,
        lifeTime: this_.time
      });

      particle.at(x, y, MathFs.randFloat(0, 360));
    }
  }),
  anukeCoin: new effect(0.1, (x, y, rotation, data, this_) => {
    let img = new Image();
    img.src = './../assets/sprites/coin.png'
      let particle = new Particle({
        size: data.getSize(),
        img: img,
        speed: 0,
        hasAlfa: true,
        lifeTime: this_.time,
        animationParticle: {
          rotationDelta: 500,
          scaleDelta: -30
        }
      });

      particle.at(x, y, MathFs.randFloat(0, 360));
    
  }),
  chanceRound: new effect(5, (x, y, rotation, data, this_) => {
    for(var i = 0; i < MathFs.randInit(20,40); i++){
    let particle = new Particle({
      size: MathFs.randFloat(40,100),
      img: global.atlas.find("junction"),
      speed:  200,
      hasAlfa: true,
      lifeTime: this_.time,
      animationParticle: {
        rotationDelta: 300,
        scaleDelta: -20
      }
    });
  
    particle.at(x, y, i * 35);
    }
  }),
  playerDead: new effect(5, (x, y, rotation, data, this_) => {
    
      
      let particle = new Particle({
        size: MathFs.randFloat(40, 100),
        img: global.atlas.find("anuke"),
        speed: 200,
        hasAlfa: true,
        lifeTime: this_.time,
        animationParticle: {
          scaleDelta: -20
        }
      });
  
      particle.at(x, y, Math.random() * 360);
    
  }),
  trailEffect: new effect(3, (x, y, rotation, data, this_) => {
  
  
    let particle = new Particle({
      size: data.getSize(),
      img: data.img,
      speed: 0,
      hasAlfa: true,
      lifeTime: this_.time,
      animationParticle: {
        scaleDelta: -20
      }
    });
  
    particle.at(x, y, data.rotation);
  
  })
}