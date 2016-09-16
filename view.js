var TETRIS = TETRIS || {};

FIRST_VISIBLE_ROW = 4;

TETRIS.view = {

  init: function(){
    $(document).on('keydown', TETRIS.controller.keyListener);
  },

  render: function(board, piece, color){
    $board = $('#board');
    $board.html("");

    for (var row = FIRST_VISIBLE_ROW; row < board.length; row++) {
      for (var col = 0; col < board[row].length; col++){
        var cell = $('<div class="cell"></div>');
        $board.append(cell);

        if (board[row][col]) {
          cell.css('background-color', board[row][col]);
        } else {
          for (var block = 0; block < piece.length; block++) {
            if (piece[block][0] === row && piece[block][1] === col) {
              cell.css('background-color', color);
            }
          }
        }

      }
    }

    $board.append( $('<p>ROWS: ' + TETRIS.game.score + '</p>') );

    //draw next pieces

    // $next = $('#next-pieces');
    // $next.html("");
    // nextPieces = TETRIS.game.nextPieces;
    // for (var i = 0; i < nextPieces.length; i++ ){

    //   for (var row = 0; row < 4; row++) {
    //     for (var col = 0; col < 4; col++){
    //       var cell = $('<div class="cell"></div>');
    //       $next.append(cell);

    //       for (var block = 0; block < nextPieces.length; block++) {
    //           if (nextPieces[block][0] === row && nextPieces[block][1] === col) {
    //             cell.css('background-color', color);
    //           }
    //       }
    //     }
    //   }
    // }

  }





};