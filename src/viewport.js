export function GetUserDrive() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  };
};

export function ReziseCanvas(UserDriveIsMobil, canvas) {
  let size = { x: canvas.width, y: canvas.height };
  if (UserDriveIsMobil) {
    if (size.x < 700) {
      size.x = 700;
      if (size.x < innerWidth) size.x = innerWidth;
    };
    if (size.y < 1000) {
      size.y = 1100;
      if (size.y < innerHeight) size.y = innerHeight;
    };
  } 
  if(!UserDriveIsMobil){
    size.x = innerWidth; //< 1600 ? 1600 : innerWidth;
    size.y = innerHeight;  //< 1000 ? 1000 : innerHeight;
  };

  return size;
}

 