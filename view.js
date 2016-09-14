var TETRIS = TETRIS || {};

TETRIS.view = {

  init: function(){

  },

  render: function(board){
    $('#board').html("");
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++){
        var cell = $('#board').append('<div class="cell"></div>');
        if (board[i][j] === "color") {
          cell.css('background-color', 'orange');
        }
      }
    }
    

  }


};