//Image Preloading
/* @pjs preload="resources/background/boardBackground.png,resources/background/boardTopBackground.png,resources/text/textbox.png,resources/tiles/tile1.png,resources/tiles/tile2.png,resources/tiles/tile3.png,resources/tiles/tileVoltorb.png"*/
var boardBackground, topBackground;
var textbox;
var tile1, tile2, tile3, tileVoltorb;

/*States: false: normal behavior
          true: awaiting click, do not refresh board or interact with tiles*/
var waitingForClick = false;
/*States: false: on click, continue normally
          true: on click, restart*/
var waitingForRestart = false;

/*First-time setup on loading the page*/
setup = function() {
  loadImages();
  width = 275 * boardScale;
  height = 206 * 2 * boardScale;

  var timerRender = setTimeout(newBoard, 100);
}

/*Preloads images into variables*/
var loadImages = function() {
  boardBackground = loadImage("resources/background/boardBackground.png");
  boardTopBackground = loadImage("resources/background/boardTopBackground.PNG");
  textbox = loadImage("resources/text/textbox.png");
  tile1 = loadImage("resources/tiles/tile1.png");
  tile2 = loadImage("resources/tiles/tile2.png");
  tile3 = loadImage("resources/tiles/tile3.png");
  tileVoltorb = loadImage("resources/tiles/tileVoltorb.png");
}

/*Loads an empty image of a board and creates a new board.*/
var newBoard = function() {
  level.scoreMax = initializeTiles();
  image(boardTopBackground, 0, 0,
    boardScale * boardBackground.width, boardScale * boardBackground.height);
  image(boardBackground, 0, height/2,
    boardScale * boardBackground.width, boardScale * boardBackground.height);
  displayRowInfo();
  displayColumnInfo();
}

/*Loads totals of rows onto the board*/
var displayRowInfo = function() {
  fill(0, 0, 0);
  for(let i = 0; i < gridCoords.rows; i++) {
    let rowInfo = getRowInfo(i);
    if(rowInfo.points > 9) {
      text(rowInfo.points, 372, 445 + 64 * i);
    } else {
      text(rowInfo.points, 379, 445 + 64 * i);
    }
    text(rowInfo.voltorbs, 379, 470 + 64 * i);
  }
}

/*Loads totals of columns onto the board*/
var displayColumnInfo = function() {
  fill(0, 0, 0);
  for(let i = 0; i < gridCoords.columns; i++) {
    let columnInfo = getColumnInfo(i);
    if(columnInfo.points > 9) {
      text(columnInfo.points, gridCoords.xOffset + 31 + 64 * i, 765);
    } else {
      text(columnInfo.points, gridCoords.xOffset + 37 + 64 * i, 765);
    }
    text(columnInfo.voltorbs, gridCoords.xOffset + 37 + 64 * i, 789);
  }
}

//Defines behavior on mouse click. Overrides function in processing.js.
mouseClicked = function() {
  if(waitingForClick) {
    waitingForClick = false;
    if(waitingForRestart) {
      waitingForRestart = false;
      setup();
    } else {
      //TODO: refresh the board
    }
    return;
  }

  //Draws tiles where the mouse is clicked.
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

  //TODO: fix for when score increases
  if(level.currentScore === 0) {
    writeTextbox("x" + tileSelected.score + "! Recieved " + level.currentScore + " Coins!");
  } else if(tileSelected.score === 2 | tileSelected.score === 3) {
    writeTextbox("x" + tileSelected.score + "! Recieved " + level.currentScore + " Coins!")
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

//Returns the image of a given tile on the board.
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
}

//Creates a textbox on the screen with the specified text.
var writeTextbox = function(message) {
  waitingForClick = true;
  image(textbox,
    5 * boardScale, height - (textbox.height + 10) * boardScale / 2,
    width - 10 * boardScale, textbox.height * boardScale / 2);
  fill(0, 0, 0);
  text(message, 20 * boardScale, height - (textbox.height - 16) * boardScale / 2);
}

//Behavior upon selecting a voltorb.
var lose = function() {
  level.failCount++;
  if(level.failCount === 3) {
    level.number = 1;
    level.failCount = 0;
  }

  waitingForRestart = true;
  writeTextbox("Oh no! You get 0 Coins!");
}
