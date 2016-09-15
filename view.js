var TETRIS = TETRIS || {};

FIRST_VISIBLE_ROW = 4;

TETRIS.view = {

  init: function(){
    $(document).on('keydown', TETRIS.controller.keyListener);
  },

  render: function(board, piece){
    $board = $('#board');
    $board.html("");

    for (var row = FIRST_VISIBLE_ROW; row < board.length; row++) {
      for (var col = 0; col < board[row].length; col++){
        var cell = $('<div class="cell"></div>');
        $board.append(cell);

        if (board[row][col]) {
          cell.css('background-color', board[row][col]);
        } else {
          for (var block = 0; block < piece.blocks.length; block++) {
            if (piece.blocks[block][0] === row && piece.blocks[block][1] === col) {
              cell.css('background-color', piece.color);
            }
          }
        }

      }
    }

  }





};