//Setup
/* @pjs preload="resources/background/boardBackground.png"*/
/* @pjs preload="resources/tiles/tile1.png"*/
/* @pjs preload="resources/tiles/tile2.png"*/
/* @pjs preload="resources/tiles/tile3.png"*/
/* @pjs preload="resources/tiles/tileVoltorb.png"*/

var boardBackground = loadImage("resources/background/boardBackground.png");
boardBackground.width *= boardScale;
boardBackground.height *= boardScale;
var tile1 = loadImage("resources/tiles/tile1.png");
var tile2 = loadImage("resources/tiles/tile2.png");
var tile3 = loadImage("resources/tiles/tile3.png");
var tileVoltorb = loadImage("resources/tiles/tileVoltorb.png");
width = boardBackground.width;
height = boardBackground.height;

setup = function() {
  image(boardBackground, 0, 0);
}

mouseClicked = function() {
  //Draws tiles where the mouse is clicked
  //TODO: fix drawing when selections are made between tiles
  var tileSelected = getSelectedTile();
  if(!(tileSelected.row === null | tileSelected.column === null)) {
    image(getTileImage(tileSelected.row, tileSelected.column),
      gridCoords.xOffset + 64 * tileSelected.column,
      gridCoords.yOffset + 64 * tileSelected.row,
      2 * tile1.width, 2 * tile1.height);
  }
}

/*Detect which tile is clicked and return it in an object with the row and
  column of the tile.*/
var getSelectedTile = function() {
  var coords = {
    column: null,
    row: null
  };
  if(!(((mouseX - gridCoords.xOffset) % 64) > 44)) {
    coords.column = Math.floor((mouseX - gridCoords.xOffset) / 64);
    if(coords.column < 0 | coords.column >= gridCoords.columns) {
      coords.column = null;
    }
  }
  if(!(((mouseY - gridCoords.YOffset) % 64) > 44)) {
    coords.row = Math.floor((mouseY - gridCoords.yOffset) / 64);
    if(coords.row < 0 | coords.row >= gridCoords.rows) {
      coords.row = null;
    }
  }
  return coords;
}

var getTileImage = function(row, column) {
  var tileScore = tiles[row][column].score;
  switch (tileScore) {
    case 1:
      return tile1;
      break;
    case 2:
      return tile2;
      break;
    case 3:
      return tile3;
      break;
    default:
      return tileVoltorb;
      break;
  }
};
