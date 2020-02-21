//Setup
/* @pjs preload="resources/background/boardBackground.png"*/
/* @pjs preload="resources/background/boardTopBackground.png"*/
/* @pjs preload="resources/tiles/tile1.png"*/
/* @pjs preload="resources/tiles/tile2.png"*/
/* @pjs preload="resources/tiles/tile3.png"*/
/* @pjs preload="resources/tiles/tileVoltorb.png"*/

var boardBackground, topBackground;
var tile1, tile2, tile3, tileVoltorb;

setup = function() {
  boardBackground = loadImage("resources/background/boardBackground.png");
  topBackground = loadImage("resources/background/boardTopBackground.png");
  tile1 = loadImage("resources/tiles/tile1.png");
  tile2 = loadImage("resources/tiles/tile2.png");
  tile3 = loadImage("resources/tiles/tile3.png");
  tileVoltorb = loadImage("resources/tiles/tileVoltorb.png");
  width = boardBackground.width * boardScale;
  // height = boardBackground.height * boardScale;
  height = 1000;

  image(boardBackground, 0, topBackground.height,
    boardScale * boardBackground.width, boardScale * boardBackground.height);
}

mouseClicked = function() {
  //Draws tiles where the mouse is clicked
  //TODO: fix drawing when selections are made between tiles
  var tileSelectedCoords = getSelectedTile();
  var tileSelected = tiles[tileSelectedCoords.row][tileSelectedCoords.column];
  if(!(tileSelectedCoords.row === null | tileSelectedCoords.column === null)) {
    image(getTileImage(tileSelectedCoords.row, tileSelectedCoords.column),
      gridCoords.xOffset + 64 * tileSelectedCoords.column,
      gridCoords.yOffset + 64 * tileSelectedCoords.row,
      boardScale * tile1.width, boardScale * tile1.height);
  }
  tileSelected.flipped = true;
  if(tileSelected.score === 0) {
    lose();
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

var lose = function() {
  level.failCount++;
  if(level.failCount === 3) {
    level.number = 1;
    level.failCount = 0;
  }
  //TODO: add delay
  initializeTiles();
  setup();
}
