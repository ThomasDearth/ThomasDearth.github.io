//Variable storing the logical components of the board.
var tiles = [[], [], [], [], []];

//Initialize the empty board
var initializeTiles = function() {
  tiles = [[], [], [], [], []];

  var info = getLevelContents(level.number);
  var score = Math.pow(2, info[0]) * Math.pow(3, info[1]);

  //Create 2s
  while(info[0] > 0) {
    var randColumn = Math.floor(5 * Math.random());
    var randRow = Math.floor(5 * Math.random());
    if(tiles[randRow][randColumn] === undefined) {
      tiles[randRow][randColumn] = new Tile(2);
      info[0]--;
    }
  }

  //Create 3s
  while(info[1] > 0) {
    var randColumn = Math.floor(5 * Math.random());
    var randRow = Math.floor(5 * Math.random());
    if(tiles[randRow][randColumn] === undefined) {
      tiles[randRow][randColumn] = new Tile(3);
      info[1]--;
    }
  }

  //Create 0s
  while(info[2] > 0) {
    var randColumn = Math.floor(5 * Math.random());
    var randRow = Math.floor(5 * Math.random());
    if(tiles[randRow][randColumn] === undefined) {
      tiles[randRow][randColumn] = new Tile(0);
      info[2]--;
    }
  }

  //Create 1s
  for(var row = 0; row < gridCoords.rows; row++) {
    for(var col = 0; col < gridCoords.columns; col++) {
      if(tiles[row][col] === undefined) {
        tiles[row][col] = new Tile(1);
      }
    }
  }

  return score;
}

var getRowInfo = function(selectedRow) {
  let rowPoints = 0;
  let rowVoltorbs = 0;
  for(let i = 0; i < gridCoords.columns; i++) {
    rowPoints += tiles[selectedRow][i].score;
    if(tiles[selectedRow][i].score === 0) {
      rowVoltorbs++;
    }
  }
  let ret = {
    points: rowPoints,
    voltorbs: rowVoltorbs
  };
  return ret;
};

var getColumnInfo = function(selectedColumn) {
  let columnPoints = 0;
  let columnVoltorbs = 0;
  for(let i = 0; i < gridCoords.rows; i++) {
    columnPoints += tiles[i][selectedColumn].score;
    if(tiles[i][selectedColumn].score === 0) {
      columnVoltorbs++;
    }
  }
  let ret = {
    points: columnPoints,
    voltorbs: columnVoltorbs
  };
  return ret;
}
