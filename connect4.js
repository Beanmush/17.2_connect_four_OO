/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(p1, p2, WIDTH = 7, HEIGHT = 6) {
    this.players = [p1, p2];
    this.WIDTH = WIDTH;
    this.HEIGHT = HEIGHT;
    this.currPlayer = p1;
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }
  
  makeBoard() {
    this.board = [];
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < this.HEIGHT; y++) {
      this.board.push(Array.from({ length:this.WIDTH}));
    }
  }
  
  makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const board = document.getElementById("board");
    board.innerHTML = '';
    // TODO: add interactive clickable cells for columns w/ID "column-top"
    
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener("click", this.handleGameClick);
  
    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    board.append(top);
  
    // TODO: create html cells for htmlBoard w/ID of `HEIGHT - WIDTH` indices.
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y > -1; y--) {
      if(!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }
  
  placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");
    let filled = document.getElementById(`${y}-${x}`)
    
    piece.setAttribute("class", 'piece');
    piece.style.backgroundColor = this.currPlayer.color;
    filled.append(piece);
  }

  endGame(msg) {
    // TODO: pop up alert message
    alert(msg);
    const top = document.querySelector("#column-top")
    top.removeEventListener("click", this.handleGameClick);
  }

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
  
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
  
    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
  
    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`${this.currPlayer.color} player  won!`);
    }
  
    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame("Tie!")
    }
    // switch players
    // TODO: switch currPlayer 1 <-> 2
    
    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  checkForWin() {
    const _win = cells => 
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        //make array of cells to check for other cells containing player piece are inline.
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

document.getElementById("start-game").addEventListener("click", () => {
  let p1 = new Player(document.getElementById("p1-color").value);
  let p2 = new Player(document.getElementById("p2-color").value);
  new Game(p1, p2);
})


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */


/** makeHtmlBoard: make HTML table and row of column tops. */


/** findSpotForCol: given column x, return top empty y (null if filled) */


/** placeInTable: update DOM to place piece into HTML table of board */



/** endGame: announce game end */



/** handleClick: handle click of column top to play piece */



/** checkForWin: check board cell-by-cell for "does a win start here?" */



  // TODO: read and understand this code. Add comments to help you.
  
  
