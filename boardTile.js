var tiles = [];

//Initialize the empty board
for(var row = 0; row < gridCoords.rows; row++) {
  var columns = [];
  for(var column = 0; column < gridCoords.columns; column++) {
    var tile = {
      score: 1,
      flipped: false
    };
    columns.push(tile);
  }
  tiles.push(columns);
}
