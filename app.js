let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player X is the human player
let count = 0; // To Track Draw
let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  board = ['', '', '', '', '', '', '', '', '']; // Reset board state
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turnO && board[index] === '') {
      box.innerText = "O"; // Human player (Player O)
      board[index] = 'O';
      turnO = false;
      
      let isWinner = checkWinner();

      if (!isWinner) {
        // Virtual player's turn
        setTimeout(makeVirtualPlayerMove, 500); // Delay virtual player's move for demonstration
      }
    }
  });
});

const makeVirtualPlayerMove = () => {
  // Simple virtual player move: choose the first available empty cell
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = 'X'; // Virtual player (Player X)
      boxes[i].innerText = 'X';
      turnO = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
      }
      
      break;
    }
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = board[pattern[0]];
    let pos2Val = board[pattern[1]];
    let pos3Val = board[pattern[2]];

    if (pos1Val !== '' && pos2Val !== '' && pos3Val !== '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
  
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
