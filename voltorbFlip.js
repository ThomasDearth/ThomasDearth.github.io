//Setup
/* @pjs preload="resources/background/boardBackground.png"*/

var boardBackground = loadImage("resources/background/boardBackground.png");
boardBackground.width *= 2;
boardBackground.height *= 2;
width = boardBackground.width;
height = boardBackground.height;

var dispText = "";

draw = function() {
  image(boardBackground, 0, 0);
  text(dispText, 400, 40);
}

mouseClicked = function() {
  //Detect which tile is clicked and store it in dispText.
  var xSquare, ySquare;
  if((mouseX - 24) % 64 > 44) {
    xSquare = null;
  } else {
    xSquare = floor((mouseX - 24) / 64);
  }
  if((mouseY - 22) % 64 > 44) {
    ySquare = null;
  } else {
    ySquare = floor((mouseY - 22) / 64);
  }
  dispText = xSquare + " " + ySquare;
}
