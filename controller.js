var TETRIS = TETRIS || {};
INTERVAL = 500;

TETRIS.controller = {

  play: function(){
    TETRIS.view.init();
    TETRIS.game.init();
    setInterval( function(){
      TETRIS.game.tic();
      TETRIS.view.render(TETRIS.game.board, TETRIS.game.current_piece);
    }, INTERVAL);
  },

  keyListener: function(event) {
    TETRIS.game.userMove(event.which);
  }


};

$('document').ready(function(){
  TETRIS.controller.play();
});