class GenerstionInterval {
  interval_ = null;
  constructor(outStart = false,fuction,time){
    this.outStart = outStart;
    this.fuction = fuction;
    this.time = time;
    if(this.outStart) this.start();
  };
  start(){
   this.interval_ = setInterval(() => {this.fuction(this)},this.time);
  };
  stop(){
    clearInterval(this.interval_)
  };
  chanceTime(time){
    this.stop();
    this.time = time;
    this.start();
  };
  setTime(time){
    this.time = time;
  };
  getTime(){
    return this.time;
  };
};