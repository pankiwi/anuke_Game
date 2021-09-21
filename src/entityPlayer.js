import {default as Entity} from './entity.js';

export default class EntityPlayer extends Entity {
  constructor( x, y, size, img ) {
    super( x, y, size, img);
    this.type = "player";
  };
};