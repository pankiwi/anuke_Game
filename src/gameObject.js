import {global} from './global.js';
import {DrawCircle} from './draw.js';

export default class GameObject {
  removeObject = false
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size * global.WindowRadius;
    this.sizeHit = size / 2 * global.WindowRadius;
    this.type = "GameObject";
    this.canUpdate = false;
  };
  draw(ctx = new CanvasRenderingContext2D) {
    //TODO
  };
  debugCollicion(ctx){
    DrawCircle(ctx,this.x,this.y,this.sizeHit,"blue");
  }
  update(deltaTime,ecene) {
    //TODO
  };
  //colicion :)
  collicionObject(object) {
    if(object){
      if(Math.hypot(this.x - object.x, this.y - object.y) - this.sizeHit - object.sizeHit < 1){
        return true ;
      }else return false;
    };
  };
};

global.loggerScript('GameObject')