//Setup
/* @pjs preload="resources/background/boardBackground.png"*/
/* @pjs preload="resources/tiles/tile1.png"*/

var boardBackground = loadImage("resources/background/boardBackground.png");
boardBackground.width *= boardScale;
boardBackground.height *= boardScale;
var tile1 = loadImage("resources/tiles/tile1.png");
width = boardBackground.width;
height = boardBackground.height;

var tileSelected = [null, null];

draw = function() {
  image(boardBackground, 0, 0);
  text(tileSelected, 400, 40);
  image(tile1,
    gridCoords.xOffset + 64 * tileSelected[0],
    gridCoords.yOffset + 64 * tileSelected[1],
    2 * tile1.width,
    2 * tile1.height);
  text(getLevelContents(1), 400, 60);
}

mouseClicked = function() {
  getSelectedTile();
}

//Detect which tile is clicked and store it in tileSelected.
var getSelectedTile = function() {
    var xSquare, ySquare;
    if(((mouseX - gridCoords.xOffset) % 64) > 44) {
      xSquare = null;
    } else {
      xSquare = floor((mouseX - gridCoords.xOffset) / 64);
      if(xSquare < 0 | xSquare >= gridCoords.columns) {
        xSquare = null;
      }
    }
    if((mouseY - gridCoords.yOffset) % 64 > 44) {
      ySquare = null;
    } else {
      ySquare = floor((mouseY - gridCoords.yOffset) / 64);
      if(ySquare < 0 | ySquare >= gridCoords.rows) {
        ySquare = null;
      }
  }
  tileSelected = [xSquare, ySquare];
}
