/**modules**/
import {global} from './global.js';

import {default as SpriteSheet} from './draw.js';
import {getAngle} from './mathFs.js';

import {default as Entity} from './entity.js';
import {default as Bullet, SpawBullet} from './bullet.js';

export default class GameMain{
  constructor( gameWidth, gameHeight, clientHasMobil, ctx = new CanvasRenderingContext2D, out) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.clientHasMobil = clientHasMobil;
    this.ctx = ctx;
    this.out = out;
    this.deltaTime = 1;
    this.fps = 1
  };
  Init(){
    this.spriteSource = new SpriteSheet();
    this.spriteSource.loadSprite("anuke","../assets/sprites/anuke.png");
    global.ObjectGame.push(new Entity(this.gameWidth/2,this.gameHeight/2,50,this.spriteSource.findSprite("anuke")));
    this.out.canvas.addEventListener('click',(event) => {
      let angle = getAngle(event.clientX,innerWidth/2,event.clientY,innerHeight/2)
      SpawBullet( this.gameWidth/2, this.gameHeight/2, 50, this.spriteSource.findSprite("anuke"),1,angle)
    });
    
  };
  DrawGame(){
    global.ObjectGame.forEach((object,indexObject) => {
      object.draw(this.ctx);
      if(global.debuger){
        object.debugCollicion(this.ctx);
      };
    });
  };
  UpdateGame(deltaTime,fps){
    this.deltaTime = deltaTime;
    this.fps = fps;
    /** remove object **/
    global.removeObjectGame();
    /** update Object **/
    global.ObjectGame.filter(object => object.canUpdate).forEach(object => {
      object.update(this.deltaTime,this);
    });
    
  };
};

global.loggerScript('game')