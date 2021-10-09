/** global **/
let global = {
  ObjectGame: [],
  Particles: [],
  WindowRadius: 1,
  debuger: false,
  UpdateGame: true,
  objectLog(){
    console.table(this.ObjectGame)
  },
  setDebug: function(){
    if(!this.debuger){
    this.debuger = true
    }else if(this.debuger){
      this.debuger = false
    } 
  },
  pause: function(){
    if (!this.UpdateGame) {
      this.UpdateGame = true
    } else if (this.UpdateGame) {
      this.UpdateGame = false
    }
  },
  /* add object */
  addParticle: function(object) {
    if(this.Particles.length < 1000) this.Particles.push(object);
  },
  /* remove object */
  removeParticle: function() {
    this.Particles = this.Particles.filter(object => !object.removeObject);
  },
  /* add object */
  addObjectGame: function(object) {
   if(this.ObjectGame.length < 1000) this.ObjectGame.push(object);
  },
  /* remove object */
  removeObjectGame: function() {
    this.ObjectGame = this.ObjectGame.filter(object => !object.removeObject);
  },
  /* return array object */
  findObject: function(type) {
    return this.ObjectGame.filter((o) => 'type' in o && o.type === type);
  }
}; 