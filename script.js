const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let squares;

  const render = () => {
    let boardHtml = "";
    board.forEach((square, index) => {
      boardHtml += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameBoard").innerHTML = boardHtml;
    squares = document.querySelectorAll(".square");
  };

  const update = (index, value) => {
    board[index] = value;
    render();
    addEventListeners();
  };

  const getGameBoard = () => {
    return board;
  };

  const addEventListeners = () => {
    squares.forEach((square) => {
      square.addEventListener("click", gameController.handleclick);
    });
  };

  const removeEventListeners = () => {
    squares.forEach((square) => {
      square.removeEventListener("click", gameController.handleclick);
    });
  };

  return { render, update, getGameBoard, addEventListeners, removeEventListeners };
})();

const gameController = (() => {
  let currentPlayerIndex;
  let gameOver;
  let players;

  const start = () => {
    const player1 = document.querySelector("#player1").value;
    const player2 = document.querySelector("#player2").value;

    // Check if player names are entered
    if (!player1 || !player2) {
      alert("Please enter names for both players.");
      return;
    }

    players = [
      { name: player1, mark: "X" },
      { name: player2, mark: "O" },
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    for (let i = 0; i < 9; i++) {
      gameBoard.update(i, "");
    }
    gameBoard.addEventListeners();
  };

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const handleclick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("-")[1]);

    if (gameBoard.getGameBoard()[index] !== "") {
      console.log("Cell is already filled.");
      return;
    }

    gameBoard.update(index, players[currentPlayerIndex].mark);

    if (checkForWin(gameBoard.getGameBoard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      document.querySelector(".msgPlayer").textContent = `${players[currentPlayerIndex].name} won!`;
      gameBoard.removeEventListeners();
      document.querySelector("#player1").value = "";
      document.querySelector("#player2").value = "";
      } else if (checkForTie(gameBoard.getGameBoard())) {
      gameOver = true;
      document.querySelector(".msgPlayer").textContent = `It's a tie!`;
      document.querySelector("#player1").value = "";
      document.querySelector("#player2").value = "";
      gameBoard.removeEventListeners();
    }
    switchPlayer();
  };

  return { start, handleclick };
})();

function checkForWin(board, mark) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === mark && board[a] === board[b] && board[a] === board[c]) {
      return true; // Return true if a win is found
    }
  }

  return false; // Return false if no win is found after checking all combinations
}

function checkForTie(board) {
  return board.every(cell => cell !== "");
}

const btnStart = document.querySelector("#btnStart");
btnStart.addEventListener("click", () => {
  gameController.start();
  document.querySelector(".msgPlayer").textContent = "";
});

gameController.start();
