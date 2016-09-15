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
SHAPES = [
  [[3,0], [3,1], [3,2], [3,3]], // FOUR ACROSS
  [[1,0], [2,0], [2,1], [3,1]], // ZIG WITH LEFT SIDE UP
  [[3,0], [2,0], [2,1], [1,1]], // ZIG WITH RIGHT SIDE UP 
  [[3,0], [2,0], [2,1], [3,1]], // SQUARE
  [[3,0], [2,0], [1,0], [1,1]], // L RIGHT
  [[3,1], [2,1], [1,1], [1,0]] // L LEFT  
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
    this.current_piece.color = TETRIS.game.getRandomColor();  //COLORS[Math.floor(Math.random() * COLORS.length)];
    this.current_piece.blocks = TETRIS.game.findShape();
    console.log(this.current_piece.blocks);
  },

  findShape: function(){
    var shape =  SHAPES[Math.floor(Math.random() * SHAPES.length)];
    var piece = [];
    var block;

    for (var i = 0; i < shape.length; i++) {
      block = [];
      for (var j = 0; j < shape[i].length; j++){
        block.push(shape[i][j]);
      }
      piece.push(block);
    }

    console.log("SHAPE: " + shape)
    return piece;
  },


  userMove: function(keycode) {
    console.log(keycode);
    if (keycode === 37) {
      TETRIS.game.moveLaterally(-1);

    } else if (keycode === 39) {
      TETRIS.game.moveLaterally(1);
    } else if (keycode === 40) {
      TETRIS.game.dropPiece();
    }
  },

  moveLaterally: function(direction) {
    var current_blocks = TETRIS.game.current_piece.blocks;
    for(var i = 0; i < current_blocks.length; i++) {
      var newCol = current_blocks[i][1] + direction;
      var pieceRow = current_blocks[i][0];
      if (newCol >= BOARD_WIDTH || newCol < 0 ){
        return false;
      } else if (TETRIS.game.board[pieceRow][newCol]) {
          var currentPiece = false;
          for (var j = 0; j < current_blocks.length; j++) {
            if ((current_blocks[j][0] === pieceRow) && 
                (current_blocks[j][1] === newCol)){
              currentPiece = true;
            } 
          }
          if (!currentPiece) {
            return false;
          }
      }
    }
    for(var k = 0; k < TETRIS.game.current_piece.blocks.length; k++) {
        var row = TETRIS.game.current_piece.blocks[k][0];
        var col = TETRIS.game.current_piece.blocks[k][1];
        TETRIS.game.board[row][col] = undefined;
      }   
    for(i = 0; i < current_blocks.length; i++) {
      current_blocks[i][1] += direction;
    }
    return true;
  },

  dropPiece: function(){
    while(TETRIS.game.movePieceDownOne());
  },

  movePieceDownOne: function() {     

    if (TETRIS.game.noCollision()) {

      for(i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
        TETRIS.game.current_piece.blocks[i][0] += 1;
      }

      return true;
    } else {
      TETRIS.game.setPiece();
      TETRIS.game.createPiece();
      return false;
    }

  },

  setPiece: function() {
    for(i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
      var row = TETRIS.game.current_piece.blocks[i][0];
      var col = TETRIS.game.current_piece.blocks[i][1];
      TETRIS.game.board[row][col] = TETRIS.game.current_piece.color;
    } 
  },

  noCollision: function() {
    var current_blocks = TETRIS.game.current_piece.blocks;
    for(var i = 0; i < current_blocks.length; i++) {
      var new_row = current_blocks[i][0] + 1;
      var col = current_blocks[i][1];

      if (new_row === BOARD_HEIGHT){
        return false;
      } else if (TETRIS.game.board[new_row][col]) {
          var currentPiece = false;
          for (var j = 0; j < current_blocks.length; j++) {
            if ((current_blocks[j][0] === new_row) && 
                (current_blocks[j][1] === col)){
              currentPiece = true;
            } 
          }
          if (!currentPiece) {
            return false;
          }
      }
    }
    return true;
  },

  getCurrentState: function() {
    // var tempBoard = TETRIS.game.board.slice(0);
    // for (var i = 0; i < current_blocks.length; i++) {
    //   var row = TETRIS.game.current_piece.blocks[i][0];
    //   var col = TETRIS.game.current_piece.blocks[i][1];
    //   tempBoard[row][col] = TETRIS.game.current_piece.color;
    // }
    // return tempBoard;
    return TETRIS.game.board
  },

  tic: function(){
    this.movePieceDownOne();
    this.deleteFullRows();
  },

  current_piece: {},

  deleteFullRows: function(){
    for (var i = 4; i < BOARD_HEIGHT; i++) {
      var markForDelete = true;
      var row = TETRIS.game.board[i];
      for (var col = 0; col < BOARD_WIDTH; col++) {
        if (!row[col]) {
          markForDelete = false;
          break;
        }
      }
      if (markForDelete) {
        TETRIS.game.board.splice(i, 1);
        TETRIS.game.liftPiece();
        TETRIS.game.addRow();
      }
    }
  },

  getRandomColor: function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  addRow: function(){
    var newRow = new Array(BOARD_WIDTH);
    TETRIS.game.board.unshift(newRow);
  },

  liftPiece: function(){
    for(var i = 0; i < TETRIS.game.current_piece.blocks.length; i++) {
        var row = TETRIS.game.current_piece.blocks[i][0];
        var col = TETRIS.game.current_piece.blocks[i][1];
        TETRIS.game.board[row][col] = undefined;
    } 
  }


};