//Setup
/* @pjs preload="resources/background/boardBackground.png" */

var boardBackground = loadImage("resources/background/boardBackground.png");
var gameElement = document.getElementById("game");

width = boardBackground.width;
height = boardBackground.height;

draw = function() {
  image(boardBackground, 0, 0);
}
