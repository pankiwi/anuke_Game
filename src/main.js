/** module **/
import { global } from './global.js';
import { default as GameMain } from './game.js';
import { GetUserDrive, ReziseCanvas } from './viewport.js';
import { default as SpriteSheet, RenderCanvas } from './draw.js';

const ClientDriveMobil = true //GetUserDrive()
/* scrend html */
const out = document.querySelector("canvas").getContext("2d");

out.canvas.width = innerWidth;
out.canvas.height = innerHeight;

/* scrend canvas */
const c = document.createElement("canvas").getContext("2d");
// resize
c.canvas.width = ReziseCanvas(ClientDriveMobil, c.canvas).x
c.canvas.height = ReziseCanvas(ClientDriveMobil, c.canvas).y

global.WindowRadius = out.canvas.width / c.canvas.width;

const anukeGame = new GameMain(c.canvas.width, c.canvas.height, ClientDriveMobil, c, out);

anukeGame.Init();


var lastFrameTimeMs = 0,
  maxFPS = 60,
  delta = 0,
  timestep = 1000 / 60,
  fps = 60,
  framesThisSecond = 0,
  lastFpsUpdate = 0,
  running = false,
  started = false,
  frameID = 0;

function DrawCanvas() {
  RenderCanvas(out, c);
  c.fillStyle = 'rgba(255,255,255,1)'
  c.fillRect(0, 0, c.canvas.width, c.canvas.height);

  anukeGame.DrawGame();
}

function update(timestep, fps) {
  anukeGame.UpdateGame(timestep, fps);
}

function panic() {
  delta = 0;
}

function stop() {
  running = false;
  started = false;
  cancelAnimationFrame(frameID);
}

function start() {
  if (!started) {
    started = true;
    frameID = requestAnimationFrame(function(timestamp) {
      DrawCanvas();
      running = true;
      lastFrameTimeMs = timestamp;
      lastFpsUpdate = timestamp;
      framesThisSecond = 0;
      frameID = requestAnimationFrame(mainLoop);
    });
  }
}

function mainLoop(timestamp) {
  // Throttle the frame rate.    
  if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
    frameID = requestAnimationFrame(mainLoop);
    return;
  }
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;



  if (timestamp > lastFpsUpdate + 1000) {
    fps = 0.25 * framesThisSecond + 0.75 * fps;

    lastFpsUpdate = timestamp;
    framesThisSecond = 0;
  }
  framesThisSecond++;

  var numUpdateSteps = 0;
  while (delta >= timestep) {
    update(timestep, fps)
    delta -= timestep;
    if (++numUpdateSteps >= 240) {
      panic();
      break;
    }
  }

  DrawCanvas();
  frameID = requestAnimationFrame(mainLoop);
}

start();