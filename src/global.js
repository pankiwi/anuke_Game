/** global **/
let global = {
  ObjectGame: [],
  WindowRadius: 1,
  debuger: false,
  UpdateGame: true,
  coinsAnuke: 0,
  points: 0,
  objectLog() {
    console.table(this.ObjectGame)
  },
  clearObjects() {
    this.ObjectGame = [];
  },
  setDebug: function() {
    if (!this.debuger) {
      this.debuger = true
    } else if (this.debuger) {
      this.debuger = false
    }
  },
  pause: function() {
    if (!this.UpdateGame) {
      this.UpdateGame = true
    } else if (this.UpdateGame) {
      this.UpdateGame = false
    }
  },
  /* add object */
  addObjectGame: function(object) {

    this.ObjectGame.push(object);
    this.ObjectGame.sort((a, b) => {
      if (a.drawLayer < b.drawLayer) return -1
    })

    return this.ObjectGame[this.ObjectGame.indexOf(object)];

  },
  /* remove object */
  removeObjectGame: function() {
    this.ObjectGame = this.ObjectGame.filter(object => !object.removeObject);
  },
  /* return array object */
  findObject: function(type) {
    return this.ObjectGame.filter((o) => 'type' in o && o.type === type);
  },
  atlas: {
    sprites: {},
    loadImages: function(imagefiles = [{ id, imagePath }]) {
      // Load Sounds
      for (let i in imagefiles) {
        let image = new Image();

        image.src = imagefiles[i].imagePath;

        this.sprites[imagefiles[i].id] = image;
      };
    },
    find(image) {
      return this.sprites[image];
    }
  },
  sound: {
    sounds: {},
    loadSound: function(soundfiles = [{ id, soundPath }]) {
      for (let i in soundfiles) {
        let audio = new Audio(soundfiles[i].soundPath);

        this.sounds[soundfiles[i].id] = audio;
      };
    },
    play(sound, volume) {
      this.sounds[sound].pause();
      this.sounds[sound].volume = volume;
      this.sounds[sound].play();
    }
  }
};