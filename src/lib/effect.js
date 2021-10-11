class effect {
  constructor(time, functionEffect = function(x, y, rotation, data, this_) {}) {
    this.time = time;
    this.functionEffect = functionEffect;
  };
  at(x, y, rotation, data){
    try{
      this.functionEffect(x, y, rotation, data, this);
    }catch(e){
      console.log(e)
    }
  };
}