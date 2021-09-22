/**modules**/
import { global } from './global.js';

import { Draw } from './lib/draw.js';

import { default as SpriteSheet } from './lib/draw.js';

import { default as EntityPlayer, SpawPlayer } from './entitys/entityPlayer.js';

export default class GameMain {
  constructor(clientHasMobil, ctx = new CanvasRenderingContext2D, out) {
    this.gameHeight = ctx.canvas.height;
    this.gameWidth = ctx.canvas.width;
    this.clientHasMobil = clientHasMobil;
    this.ctx = ctx;
    this.out = out;
  };
  Init() {
    this.spriteSource = new SpriteSheet();
    this.spriteSource.loadSprite("anuke", "../assets/sprites/anuke.png");
    /** player **/
    SpawPlayer(this.gameWidth/2, this.gameHeight/2, 120, this.spriteSource.findSprite('anuke'));
    
  };
  DrawGame() {
    global.ObjectGame.forEach((object, indexObject) => {
      object.draw(this.ctx);
      if (global.debuger) {
        object.debugCollicion(this.ctx);
      };
    });
  };
  UpdateGame() {
    /** remove object **/
    global.removeObjectGame();
    /** update Object **/
    global.ObjectGame.filter(object => object.canUpdate).forEach(object => {
      object.update(this);
    });
    
  };
};

