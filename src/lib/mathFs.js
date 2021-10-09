/** math functions **/
let MathFs = {
  getAngle: function(x1, x2, y1, y2) {
    return Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
  },
  AngleToRadians: function(angle) {
    return angle * (Math.PI / 180);
  },
  randFloat: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  randInit: function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  DistanceObjects: function(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  },
  DistanceObjects2: function(x1, y1, x2, y2) {
    return Math.hypot(Math.pow(x1 - x2, 2), Math.pow(y1 - y2, 2));
  },
  trnsX: function(angle, width){
    return Math.cos(Math.PI * angle / 180) * width;
  },
  trnsY: function(angle, width) {
    return Math.sin(Math.PI * angle / 180) * width;
  },
  lerpt: function(lerp, var1, var2) {
    if (rot > var2) {
      rot -= lerp;
    } else if (rot < var2) {
      rot += lerp
    }
    return rot;
  }
}