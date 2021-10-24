let Viewport = {
  GetUserDrive: function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    };
  },

  ReziseCanvas: function(UserDriveIsMobil, canvas) {
    let size = { x: canvas.width, y: canvas.height };
    if (UserDriveIsMobil) {
      if (size.x < 800) {
        size.x = 800;
        if (size.x < innerWidth) size.x = innerWidth;
      };
      if (size.y < 1300) {
        size.y = 1300;
        if (size.y < innerHeight) size.y = innerHeight;
      };
    }
    if (!UserDriveIsMobil) {
      size.x =  innerWidth;
      size.y =   innerHeight;
    };

    return size;
  }

}