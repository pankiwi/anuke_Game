function getCoordsScreendX(clientX) {
  return (clientX - canvas_viewport.left) * radio_user;
};

function getCoordsScreendY(clientY) {
  return (clientY - canvas_viewport.top) * radio_user;
};
const out = document.querySelector("canvas").getContext("2d");

const c = document.createElement("canvas").getContext("2d");
//set Size
out.canvas.width = innerWidth
out.canvas.height = innerHeight
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  c.canvas.width = innerWidth < 800 ? 800 : innerWidth;
  c.canvas.height = innerHeight < 1300 ? 1300 : innerHeight;

} else {
  c.canvas.width = innerWidth;
  c.canvas.height = innerHeight;

}
let radio_user = out.canvas.width / c.canvas.width;
//set stat window
let MAX_X_GAME = c.canvas.width;
let MAX_Y_GAME = c.canvas.height;
//viewport radius
let canvas_viewport = out.canvas.getBoundingClientRect();
//star game :/

let debug = false

let player = new PlayerEntity(MAX_X_GAME / 2, MAX_Y_GAME / 2, imgs.anuke, 100, 60);
let circle = new cicle(0, 0, 80)
/* power ups */

function animation() {
  requestAnimationFrame(animation)

  /*clear*/
  c.fillStyle = "rgba(0,0,0,0.3)"
  c.fillRect(0, 0, c.canvas.width, c.canvas.height)
  player.update()
  circle.update()
  UIConfig_.drawAllUI()
  animatior.drawAllAnimation()
  out.drawImage(c.canvas, 0, 0, c.canvas.width, c.canvas.height, 0, 0, out.canvas.width, out.canvas.height);
}

window.onload = () => {
  animation();
}

out.canvas.addEventListener("click", (event) => {
  event.preventDefault()
  
}, { passive: false })