import {global} from './global.js';
/* load and play sound */
export  function PlaySound(src, volume) {
  let sound = document.createElement("audio");
  sound.src = src;
  sound.volume = volume / 100;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  sound.play();
};

export  function PlaySoundRandom(srcs = [], volume = 1) {
  let src = srcs[Math.floor(Math.random() * srcs.length)]
  let sound = document.createElement("audio");
   sound.src = src;
   sound.volume = volume / 100
   sound.setAttribute("preload", "auto");
   sound.setAttribute("controls", "none");
   sound.style.display = "none";
   sound.play();
};

global.loggerScript('sound')