import { global } from './global.js';

import { Viewport } from './lib/viewport.js';

import { Draw } from './lib/draw.js';

import { default as GameMain } from './game.js';



const ClientDriveMobil = Viewport.GetUserDrive();
/* scrend html */
const out = document.querySelector("canvas").getContext("2d");

out.canvas.width = innerWidth;
out.canvas.height = innerHeight;

/* scrend canvas */
const c = document.createElement("canvas").getContext("2d");
// resize
c.canvas.width = Viewport.ReziseCanvas(ClientDriveMobil, c.canvas).x;
c.canvas.height = Viewport.ReziseCanvas(ClientDriveMobil, c.canvas).y;

global.WindowRadius = out.canvas.width / c.canvas.width;

const anukeGame = new GameMain(ClientDriveMobil, c, out)

anukeGame.Init();


function gameLoop() {
  requestAnimationFrame(gameLoop)
  Draw.RenderCanvas(out, c);
  
  c.fillStyle = 'rgba(255,255,255,1)';
  c.fillRect(0,0,c.canvas.width,c.canvas.height);

  anukeGame.DrawGame();

  anukeGame.UpdateGame();



}

window.onload = gameLoop;