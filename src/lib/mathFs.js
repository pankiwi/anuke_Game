/** math functions **/
let MathFs = {
 getAngle: function(x1, x2, y1, y2) {
    return Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
  },
  AngleToRadians: function(angle){
    return angle * (Math.PI / 180);
  },
  randFloat: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  randInit: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  DistanceObjects: function(x1,y1,x2,y2){
    return Math.hypot(x1 - x2, y1 - y2);
  },
  DistanceObjects2: function(x1, y1, x2, y2) {
    return Math.hypot(Math.pow(x1 - x2,2),Math.pow(y1 - y2,2));
  },
  lerpt: function(time,var1,var2){
    if(var1 > var2){
      return var1 -= time;
    }else
    if(var1 < var2){
      return var1 += time;
    }else return var1
  }
}