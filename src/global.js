/** global **/
let global = {
  ObjectGame: [],
  WindowRadius: 1,
  debuger: true,
  /* add object */
  addObjectGame: function(object){
    this.ObjectGame.push(object);
  },
  /* remove object */
  removeObjectGame: function(){
    this.ObjectGame = this.ObjectGame.filter(object => !object.removeObject)
  },
  /* return array object */
  findObject: function(type){
    return this.ObjectGame.filter((o) => 'type' in o && o.type == type);
    
  },
  
  findObjectCallback: function(type, callback = function(object,indexObject,array){}){
    this.findObject(type).map(callback);
  }
};

