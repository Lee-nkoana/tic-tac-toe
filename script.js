const gameBoard = (() => {
  const board = ["", "", "","", "", "","", "", ""];
  const render = () => {
    let boardHtml = "";
    board.forEach((square, index) => {
      boardHtml += `<div class="square" id=square-${index}">${square}</div>`
    });
  };
  document.querySelector("#gameBoard").innerHTML = boardHtml;

  return{ render}
})();