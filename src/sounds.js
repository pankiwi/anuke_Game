let sounds = {
  addSound: function(path, name){
    let sound_ = document.createElement("audio");
    sound_.src = path;
    sound_.id = name;
    document.body.appendChild(sound_);
  },
  playSound: function(pith, name){
    let sound_ =  document.getElementById(name);
    sound_.pause();
    sound_.volume = pith;
    sound_.play();
  }
}