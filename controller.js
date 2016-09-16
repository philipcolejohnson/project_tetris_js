var TETRIS = TETRIS || {};
INTERVAL = 25;

TETRIS.controller = {

  play: function(){
    TETRIS.view.init();
    TETRIS.game.init();
    TETRIS.game.loop = setInterval( function(){
      TETRIS.game.tic();
      TETRIS.view.render(TETRIS.game.board, TETRIS.game.translateShape(TETRIS.game.current_piece.row, TETRIS.game.current_piece.col), TETRIS.game.current_piece.color);
    }, INTERVAL);
  },

  keyListener: function(event) {
    TETRIS.game.userMove(event.which);
  }


};

$('document').ready(function(){
 TETRIS.controller.play();
});