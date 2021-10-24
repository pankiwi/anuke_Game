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
    sprites: [],
    loadcount: 0,
    loadtotal: 0,
    preloaded: false,
    loadImages: function(imagefiles) {
      // Load the images
      var loadedimages = [];
      this.loadtotal = imagefiles.length;
      for (var i = 0; i < imagefiles.length; i++) {
        // Create the image object
        var image = new Image();
        // Set the source url of the image
        image.src = imagefiles[i];
        // Add onload event handler
        image.onload = function() {
          this.loadcount++;
          if (this.loadcount == this.loadtotal) {
            // Done loading
            this.preloaded = true;
          }
        };

        // Save to the image array
        loadedimages[i] = image;
      }

      // Return an array of images
      this.sprites = loadedimages;
    }
  }
};