
let Sound_source_ = {
 Sounds_: {
  effect_item_use: [new Audio("./aud/effect_item_use_1.wav"), new Audio("./aud/effect_item_use_2.wav"), new Audio("./aud/effect_item_use_3.wav")],
  hit: [new Audio("./aud/hit_1.wav"), new Audio("./aud/hit_2.wav")],
  dead: [new Audio("./aud/dead_1.wav"), new Audio("./aud/dead_2.wav"), new Audio("./aud/dead_3.wav")],
  shot: [new Audio("./aud/shot_1.wav"), new Audio("./aud/shot_2.wav")],
  next_round: [new Audio("./aud/next_round.wav")],
  multi_shot: [new Audio("./aud/shot_multi_0.wav"), new Audio("./aud/shot_multi_1.wav"), new Audio("./aud/shot_multi_2.wav")]
 },

 playSound: function(category, target) {
  var sound = this.Sounds_[category][target] ? this.Sounds_[category][target] : this.Sounds_.dead[0]
  sound.play()
 },
 playRandomSoundTarget: function(category, targets) {
  let sound = this.Sounds_[category][targets[Math.floor(Math.random() * targets.length)]] ? this.Sounds_[category][targets[Math.floor(Math.random() * targets.length)]] : this.Sounds_.dead[0]
  sound.play()
 },
 playRandomSound: function(category){
  let sound = this.Sounds_[category][Math.floor(Math.random() * this.Sounds_[category].length)]
  sound.play()
 }
}