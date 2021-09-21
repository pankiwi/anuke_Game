export  let global = {
  ObjectGame: [],
  WindowRadius: 1,
  debuger: true,
  /* add object */
  addObjectGame: function(object){
    this.ObjectGame.push(object);
    if(this.debuger) console.table(object)
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
    this.FindObject(type).map(callback);
  },
  loggerScript: function(script){
     if(this.debuger)console.log(script)
  }
};

global.loggerScript('global')