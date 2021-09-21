/* require */
import {global} from './global.js';

import {default as GameObject} from './gameObject.js';

import {DrawImage, DrawCircle} from './draw.js';

export default class Entity extends GameObject{
  constructor(x, y, size, img){
    super( x, y, size);
    this.img = img;
    this.alfa = 1;
    this.type = "EntityNull";
    this.canUpdate = true;
  };
  draw(ctx = new CanvasRenderingContext2D){
    DrawImage(ctx, this.img, this.x, this.y, this.alfa, this.size);
  };
};

global.loggerScript('Entity')