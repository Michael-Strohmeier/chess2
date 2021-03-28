function setup() {
  createCanvas(400, 400);
  ce = new ChessEngine();
}

function draw() {
  background(220);
  
}

const State = {PLAYER_ONE_MOVE: 0,
               PLAYER_TWO_MOVE: 1,
               CHECK: 2,
               CHECKMATE: 3};

let notationMap = {'a8': [0, 0], 'b8': [0, 1], 'c8': [0, 2], 'd8': [0, 3], 'e8': [0, 4], 'f8': [0, 5], 'g8': [0, 6], 'h8': [0, 7], 'a7': [1, 0], 'b7': [1, 1], 'c7': [1, 2], 'd7': [1, 3], 'e7': [1, 4], 'f7': [1, 5], 'g7': [1, 6], 'h7': [1, 7], 'a6': [2, 0], 'b6': [2, 1], 'c6': [2, 2], 'd6': [2, 3], 'e6': [2, 4], 'f6': [2, 5], 'g6': [2, 6], 'h6': [2, 7], 'a5': [3, 0], 'b5': [3, 1], 'c5': [3, 2], 'd5': [3, 3], 'e5': [3, 4], 'f5': [3, 5], 'g5': [3, 6], 'h5': [3, 7], 'a4': [4, 0], 'b4': [4, 1], 'c4': [4, 2], 'd4': [4, 3], 'e4': [4, 4], 'f4': [4, 5], 'g4': [4, 6], 'h4': [4, 7], 'a3': [5, 0], 'b3': [5, 1], 'c3': [5, 2], 'd3': [5, 3], 'e3': [5, 4], 'f3': [5, 5], 'g3': [5, 6], 'h3': [5, 7], 'a2': [6, 0], 'b2': [6, 1], 'c2': [6, 2], 'd2': [6, 3], 'e2': [6, 4], 'f2': [6, 5], 'g2': [6, 6], 'h2': [6, 7], 'a1': [7, 0], 'b1': [7, 1], 'c1': [7, 2], 'd1': [7, 3], 'e1': [7, 4], 'f1': [7, 5], 'g1': [7, 6], 'h1': [7, 7]};

let notatedBoard = [['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
                   ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
                   ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
                   ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
                   ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
                   ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
                   ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
                   ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1']];


class Piece {
  constructor(label, notation) {
    this.label = label;
    this.notation = notation;
    this.pos = new p5.Vector(notationMap[this.notation][0], notationMap[this.notation][1]);
  }
  
  getPosition() {
    return this.pos;
  }
  
  getLabel() {
    return this.label;
  }
  
  move(notation) {
    this.notation = notation;
    this.pos = new p5.Vector(notationMap[this.notation][0], notationMap[this.notation][1]);
  }
}

class Pawn extends Piece {
  constructor(label, notation) {
    super(label, notation);
  }
  
  getLegalMoves(board) {
    let legalMoves = [];
    if (this.label == this.label.toLowerCase()) {
      // black pawn
    } else {
      // white pawn
      if (board[this.pos.x - 1][this.pos.y] == ".") {
        legalMoves.push(notatedBoard[this.pos.x - 1][this.pos.y]);
        
        if (this.pos.x == 6 && board[this.pos.x - 2][this.pos.y] == ".") {
          legalMoves.push(notatedBoard[this.pos.x - 2][this.pos.y]);
        }
      }
    }
    
    
    // y is the column and x is the row
    
    if (this.pos.y > 0 && board[this.pos.x - 1][this.pos.y - 1] != ".") {
      // left diagonal
      let pieceToAttack = board[this.pos.x - 1][this.pos.y - 1];
      if (pieceToAttack == pieceToAttack.toLowerCase()) {
        // it is a black piece
        legalMoves.push(notatedBoard[this.pos.x - 1][this.pos.y - 1]);
      }
    }
    
    if (this.pos.y < 7 && board[this.pos.x - 1][this.pos.y + 1] != ".") {
      // right diagonal
      let pieceToAttack = board[this.pos.x - 1][this.pos.y + 1];
      if (pieceToAttack == pieceToAttack.toLowerCase()) {
        // it is a black piece
        legalMoves.push(notatedBoard[this.pos.x - 1][this.pos.y + 1]);
      }
    }
    
    return legalMoves;
  }
}

class ChessEngine {
  constructor() {
    // upperCase == white, lowerCase == black
    this.board = [['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.']];
    
    this.pieces = [];
    
    this.state = State.PLAYER_ONE_MOVE;
    
    this.setup();
    print(this.pieces[0].getPosition());

    print(this.pieces[0].getLegalMoves(this.board));
    this.move(3, 0);
    print(this.pieces[0].getPosition());

  }
  
  setup() {
    this.state = State.PLAYER_ONE_MOVE;
    this.pieces.push(new Pawn('P', 'a2'));
    
    for (let i = 0; i < this.pieces.length; i++) {
      let x = this.pieces[i].getPosition().x;
      let y = this.pieces[i].getPosition().y;
      this.board[x][y] = this.pieces[i].getLabel();
    }
    
    /*
    this.board = [['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
                  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['.', '.', '.', '.', '.', '.', '.', '.'],
                  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
                  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']];
    */
  }
  
  move(x, y) {
    // x, y are the coordinates you want to move to
    let legalMoves = this.pieces[0].getLegalMoves(this.board);
    for (let i = 0; i < legalMoves.length; i++) {
      if (notatedBoard[x][y] == legalMoves[i]) {
        this.pieces[0].move(legalMoves[i]);
      }
    }
  }
  
  reset() {
    this.state = State.PLAYER_ONE_MOVE;
  }
}
