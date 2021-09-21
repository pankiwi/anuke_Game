  export function getAngle(x1, x2, y1, y2) {
    return Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
  };
  export function AngleToRadians(angle){
    return angle * (Math.PI / 180);
  }
  export function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };