//Contains useful constants

var boardScale = 2;

var gridCoords = {
  xOffset: 22,
  yOffset: 432,
  rows: 5,
  columns: 5
}

var getLevelContents = function(levelNum) {
  var levels = [
    // Source: https://bulbapedia.bulbagarden.net/wiki/Voltorb_Flip
    [ [ 3, 1, 6 ], [ 0, 3, 6 ], [ 5, 0, 6 ], [ 2, 2, 6 ], [ 4, 1, 6 ] ],
    [ [ 1, 3, 7 ], [ 6, 0, 7 ], [ 3, 2, 7 ], [ 0, 4, 7 ], [ 5, 1, 7 ] ],
    [ [ 2, 3, 8 ], [ 7, 0, 8 ], [ 4, 2, 8 ], [ 1, 4, 8 ], [ 6, 1, 8 ] ],
    [ [ 3, 3, 8 ], [ 0, 5, 8 ], [ 8, 0, 10 ], [ 5, 2, 10 ], [ 2, 4, 10 ] ],
    [ [ 7, 1, 10 ], [ 4, 3, 10 ], [ 1, 5, 10 ], [ 9, 0, 10 ], [ 6, 2, 10 ] ],
    [ [ 3, 4, 10 ], [ 0, 6, 10 ], [ 8, 1, 10 ], [ 5, 3, 10 ], [ 2, 5, 10 ] ],
    [ [ 7, 2, 10 ], [ 4, 4, 10 ], [ 1, 6, 13 ], [ 9, 1, 13 ], [ 6, 3, 10 ] ],
    [ [ 0, 7, 10 ], [ 8, 2, 10 ], [ 5, 4, 10 ], [ 2, 6, 10 ], [ 7, 3, 10 ] ],
  ];
  var options = levels[levelNum-1];
  return options[Math.floor(Math.random() * 5)];
};
