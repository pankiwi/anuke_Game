/* load and play sound */
let Sounds = {
  PlaySound: function(sound_, volume) {
  let sound = document.createElement("audio");
  sound.src = '../../assets/sounds/' + sound_ + '.wav';
  sound.volume = volume;
  sound.setAttribute("preload", "auto");
  sound.setAttribute("controls", "none");
  sound.style.display = "none";
  sound.play();
}
}