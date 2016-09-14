var TETRIS = TETRIS || {};

TETRIS.controller = {

  play: function(){
    TETRIS.view.init();
    TETRIS.game.init();
    setInterval( function(){
      TETRIS.game.tic();
      TETRIS.view.render(TETRIS.game.getCurrentState());
    }, 1000);
  }


};

$('document').ready(function(){
  TETRIS.controller.play();
});