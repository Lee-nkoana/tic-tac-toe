const gameBoard = (() => {
  const board = ["", "", "","", "", "","", "", ""];
  const render = () => {
    let boardHtml = "";
    board.forEach((square, index) => {
      boardHtml += `<div class="square" id="square-${index}">${square}</div>`
    });
    document.querySelector("#gameBoard").innerHTML = boardHtml;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", gameController.handleclick);
    })
    };

    const update = (index, value) => {
      board[index] = value;
      console.log(value);
      console.log(board);
      render();
    }

    const getGameBoard = () => {
      return board;
    }

  return{ render, update, getGameBoard,}
})();


const gameController = (() => {
  let currentPlayerIndex;
  let gameOver;

  const players = [
    {
      name: "Player 1",
      mark: "X"
    },
    {
      name: "Player 2",
      mark: "O"
    }
  ];
  const start = () => {
    currentPlayerIndex = 0;
    gameOver = false;
    for (let i = 0; i < 9; i++){
      gameBoard.update(i,"");
    }
    gameBoard.render();
  }

  const switchPlayer = () => {
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  const handleclick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);

    if (gameBoard.getGameBoard()[index] !== "") {
      console.log("Cell is already filled.");
      return;
    }
  
    gameBoard.update(index, players[currentPlayerIndex].mark);

    console.log("Current player index:", currentPlayerIndex); 
    switchPlayer();
  }

  return{start, handleclick, }
})();

const btnStart = document.querySelector("#btnStart");
btnStart.addEventListener("click", () => {
  gameController.start();
})

gameController.start();