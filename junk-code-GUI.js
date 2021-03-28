function setup() {
  createCanvas(400, 400);
  chess = new Chess();
}

function draw() {
  background(220);
  chess.draw();
}

class BoardTile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(255);
    this.tileSize = 400 / 8;
  }
  
  setColor(white, black) {
    if (this.x % 2 == this.y % 2) {
      this.color = white;
    } else {
      this.color = black;
    }
  }
  
  draw() {
    fill(this.color);
    rect(this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
  }
  
}

class Board {
  constructor() {
    this.tileSize = 400 / 8;
    this.tiles = [];
    
    this.white = color(255);
    this.black = color(0);
    
    this.setup();
  }
  
  setup() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.tiles.push(new BoardTile(i, j));
      }
    }
    
    for (let i = 0; i < 64; i++) {
      this.tiles[i].setColor(this.white, this.black);
      
    }
  }
  
  draw() {
    for (let i = 0; i < 64; i++) {
      this.tiles[i].draw();
      
    }
  }
}

class Chess {
  constructor() {
    this.board = new Board();
  }
  
  draw() {
    this.board.draw();
  }
}
