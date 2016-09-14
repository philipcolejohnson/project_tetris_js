var TETRIS = TETRIS || {};

BOARD_WIDTH = 10;
BOARD_HEIGHT = 20 + 4;
COLORS = [
  "red",
  "green",
  "blue",
  "orange",
  "yellow",
  "purple"
];

// model
//  gameboard = nested array that adds set pieces as they are set
//  current_piece = array of coordinates [[[1,2][1,3][1,4]], orange]
//  
//  

TETRIS.game = {

  init: function() {
    this.createBoard();
    this.createPiece();
  },

  createBoard: function(){
    this.board = new Array(BOARD_HEIGHT);

    for(var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(BOARD_WIDTH);
    }
  },

  createPiece: function() {
    this.current_piece.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.current_piece.blocks = [ [3,2], [3,3], [3,4] ];
  },

  movePiece: function() {     

    if (TETRIS.game.noCollision()) {
      for(var i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
        var row = TETRIS.game.current_piece.blocks[i][0];
        var col = TETRIS.game.current_piece.blocks[i][1];
        TETRIS.game.board[row][col] = undefined;
      } 

      for(i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
        TETRIS.game.current_piece.blocks[i][0] += 1;
      }

      for(i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
        row = TETRIS.game.current_piece.blocks[i][0];
        col = TETRIS.game.current_piece.blocks[i][1];
        TETRIS.game.board[row][col] = TETRIS.game.current_piece.color;
      } 
    } else {
      TETRIS.game.createPiece();
    }

  },

  noCollision: function() {
    for(i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
      new_row = TETRIS.game.current_piece.blocks[i][0] + 1;
      col = TETRIS.game.current_piece.blocks[i][1];

      if (new_row === BOARD_HEIGHT || TETRIS.game.board[new_row][col]) {
        return false;
      }
    }

    return true;
  },

  getCurrentState: function() {
    // var tempBoard = TETRIS.game.board.slice(0);
    // for (var i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
    //   var row = TETRIS.game.current_piece.blocks[i][0];
    //   var col = TETRIS.game.current_piece.blocks[i][1];
    //   tempBoard[row][col] = TETRIS.game.current_piece.color;
    // }
    // return tempBoard;
    return TETRIS.game.board
  },

  tic: function(){
    this.movePiece();
  },

  current_piece: {}

};