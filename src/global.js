/** global **/
let global = {
  ObjectGame: [],
  Particles: [],
  WindowRadius: 1,
  debuger: true,
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
    this.ObjectGame.push(object);
  },
  /* remove object */
  removeObjectGame: function() {
    this.ObjectGame = this.ObjectGame.filter(object => !object.removeObject)
  },
  /* return array object */
  findObject: function(type) {
    return this.ObjectGame.filter((o) => 'type' in o && o.type === type);

  },

  findObjectCallback: function(type, callback = function(object, indexObject, array) {}) {
    this.findObject(type).map(callback);
  }
};