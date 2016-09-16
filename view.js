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

    $next = $('#next-pieces');
    $next.html("");
    nextPieces = TETRIS.game.nextPieces;

    for (var i = nextPieces.length - 1; i >= 0; i-- ){
      $square = $('<div class="futurePiece">');
      var current_blocks = TETRIS.game.translateShape(0,0,0, nextPieces[i]);

      for (row = 0; row < 4; row++) {
        for (col = 0; col < 4; col++){
          $cell = $('<div class="cell"></div>');
          $square.append($cell);

          for (block = 0; block < current_blocks.length; block++) {
              if (current_blocks[block][0] === row && current_blocks[block][1] === col) {
                $cell.css('background-color', nextPieces[i].color);
              }
          }
        }
        $square.append($('<br>'));
      }

      $next.append($square);
      $next.append($('<br>'));
    }

  }





};