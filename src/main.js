
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

const sprites = new SpriteSheet();

sprites.loadSprite("anuke",'../assets/sprites/anuke.png')
sprites.loadSprite("router",'../assets/sprites/router.png')

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