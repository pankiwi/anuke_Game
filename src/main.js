
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

const sprites = {
  anuke: new Image(),
  router: new Image()
}
sprites.anuke.src = './assets/sprites/anuke.png'
sprites.router.src = './assets/sprites/router.png'

const anukeGame = new GameMain(ClientDriveMobil, c, out, sprites);

/** init **/

anukeGame.Init();


/** game loop **/
function gameLoop() {
  requestAnimationFrame(gameLoop)
  Draw.RenderCanvas(out, c);
  
  c.fillStyle = 'rgba(255,255,255,1)';
  c.fillRect(0,0,c.canvas.width,c.canvas.height);
  
  anukeGame.UpdateGame();

  anukeGame.DrawGame();
}

window.onload = gameLoop