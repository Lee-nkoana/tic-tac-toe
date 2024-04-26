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

  return{ render, update,}
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
    gameBoard.render();
  }

  const handleclick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    gameBoard.update(index, players[currentPlayerIndex].mark);

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }

  return{start, handleclick,}
})();

const btnStart = document.querySelector("#btnStart");
btnStart.addEventListener("click", () => {
  gameController.start();
})