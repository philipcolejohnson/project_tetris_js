var TETRIS = TETRIS || {};

BOARD_WIDTH = 10;
BOARD_HEIGHT = 20 + 4;
STARTING_THRESHOLD = 200;
COLORS = [
  "red",
  "green",
  "blue",
  "orange",
  "yellow",
  "purple"
];

TETRIS.game = {

  init: function() {
    this.createBoard();
    this.current_piece = new TETRIS.game.createPiece();
    this.threshold = STARTING_THRESHOLD;
    this.score = 0;
    this.nextPieces = [];
    TETRIS.game.createPieceList(3);
  },

  createBoard: function(){
    this.board = new Array(BOARD_HEIGHT);

    for(var i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(BOARD_WIDTH);
    }
  },

  createPiece: function() {
    this.color = TETRIS.game.getRandomColor();  //COLORS[Math.floor(Math.random() * COLORS.length)];
    // this.current_piece.blocks = TETRIS.game.findShape();
    this.counter = 0;

    TETRIS.game.pieceStartingConditions(this);

    this.rotate = function(direction) {
      if (TETRIS.game.noCollision(0, 0, direction)) {
        this.rotation = TETRIS.game.getRotationIndex(direction);
      }
    };
  },

  createPieceList: function(numPieces) {
    TETRIS.game.nextPieces = [];
    for (var i = 0; i < numPieces; i++) {
      TETRIS.game.nextPieces.push( new TETRIS.game.createPiece() );
    }
  },

  pieceStartingConditions: function(piece) {
    piece.shape = TETRIS.game.findShape();
    piece.rotation = TETRIS.game.findRotation(piece);
    piece.row = FIRST_VISIBLE_ROW - SHAPES[piece.shape][piece.rotation].length;
    piece.col = Math.floor(Math.random() * (BOARD_WIDTH - SHAPES[piece.shape].length));
  },

  translateShape: function(x, y, rot) {
    var rotationIndex;

    if (rot) {
      rotationIndex = TETRIS.game.getRotationIndex(rot);
    } else {
      rotationIndex = TETRIS.game.current_piece.rotation;
    }

    var shape = SHAPES[TETRIS.game.current_piece.shape][rotationIndex];
    var piece = [];

    var pieceRow = x,
        pieceCol = y;

    for (var row = 0; row < shape.length; row++) {
      for (var col = 0; col < shape[row].length; col++){
        if (shape[row][col]) {
          piece.push([pieceRow + row, pieceCol + col]);
        }
      }
    }

    return piece;
  },

  findShape: function() {
    return Math.floor(Math.random() * SHAPES.length);
  },

  findRotation: function(piece) {
    return Math.floor(Math.random() * SHAPES[piece.shape].length);
  },

  getRotationIndex: function(direction) {
    var numRotations = SHAPES[TETRIS.game.current_piece.shape].length;
    var rot = TETRIS.game.current_piece.rotation;

    if (rot + direction >= 0) {
        return (rot + direction) % numRotations;
    } else {
      return rot + direction + numRotations;
    }
  },


  userMove: function(keycode) {
    console.log(keycode);
    if (keycode === 37) {
      TETRIS.game.moveLaterally(-1);

    } else if (keycode === 39) {
      TETRIS.game.moveLaterally(1);
    } else if (keycode === 40) {
      TETRIS.game.movePieceDownOne();
      TETRIS.game.movePieceDownOne();
    }
    else if (keycode === 32) {
      TETRIS.game.dropPiece();
    }
    else if (keycode === 38) {
      TETRIS.game.current_piece.rotate(1);
    }
    else if (keycode === 90) {
      TETRIS.game.current_piece.rotate(-1);
    }
  },

  moveLaterally: function(direction) {
    var current_blocks = TETRIS.game.translateShape(TETRIS.game.current_piece.row + direction, TETRIS.game.current_piece.col);

    if (TETRIS.game.noCollision(0, direction) ) {
      TETRIS.game.current_piece.col += direction;
      return true;
    } else {
      return false;
    }
  },

  dropPiece: function(){
    while(TETRIS.game.movePieceDownOne());
  },

  movePieceDownOne: function() {     

    if (TETRIS.game.noCollision(1, 0)) {
      TETRIS.game.current_piece.row += 1;
      return true;
    } else {
      TETRIS.game.setPiece();
      if ( !TETRIS.game.checkForLoss() ) {
        TETRIS.game.current_piece = TETRIS.game.nextPieces.pop();
        TETRIS.game.nextPieces.unshift( new TETRIS.game.createPiece() );
      } else {
        TETRIS.game.over();
      }
      return false;
    }

  },

  setPiece: function() {
    var current_blocks = TETRIS.game.translateShape(TETRIS.game.current_piece.row, TETRIS.game.current_piece.col);

    for(i = 0; i < current_blocks.length; i++) {
      var row = current_blocks[i][0];
      var col = current_blocks[i][1];
      TETRIS.game.board[row][col] = TETRIS.game.current_piece.color;
    } 
  },

  noCollision: function(row, col, rot) {
    var current_blocks = TETRIS.game.translateShape(TETRIS.game.current_piece.row + row, TETRIS.game.current_piece.col + col, rot);

    for(var i = 0; i < current_blocks.length; i++) {
      var row = current_blocks[i][0];
      var col = current_blocks[i][1];

      if (col >= BOARD_WIDTH || col < 0 || row === BOARD_HEIGHT || TETRIS.game.board[row][col]) {
        return false;
      } 
    }
    return true;
  },

  tic: function(){
    if (TETRIS.game.current_piece.counter >= TETRIS.game.threshold) {
      this.movePieceDownOne();
      TETRIS.game.current_piece.counter = 0;
    }
    TETRIS.game.current_piece.counter += 10;
    this.deleteFullRows();
  },

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
        TETRIS.game.addRow();
        TETRIS.game.threshold -= 10;
        TETRIS.game.score++;
      }
    }
  },

  checkForLoss: function() {
    for (var i = 0; i < BOARD_WIDTH; i++) {
      if (TETRIS.game.board[FIRST_VISIBLE_ROW - 1][i]) {
        return true;
      }
    }

    return false;
  },

  over: function() {
    alert("You lost!");
    clearInterval(TETRIS.game.loop);
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
  }


};