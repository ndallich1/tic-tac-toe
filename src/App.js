import React from "react";
import { useState } from "react"; // helps remember things such as a square getting clicked, then fill it with an X or O

// Below we are creating components
// Component = a piece of reusable code that represents a part of a UI.
// Components are used to render, manage, and update the UI elements in your application.

// child component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// defining a function called Square and exporting it (javascript keyword) so that the function is accessible outside of this file. The default keyword tells other files using your code that it's the main function in this file.
// parent component
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null)); // (Array(9).fill(null)) = creates an array with 9 elements and sets each of them to null. The useState() call around it declares a squares state variable that's initially set to that array. Each entry in the array corresponds to the value of a square. When you fill the board in later, the squares array will look like this:
  // ['0', null, 'X', 'X', 'X', 'O', 'O', null, null]

  // the below function creates a copy of the squares array (nextSquares) with the javascript slice() array method.
  // Then handleClick updates the nextSquares array to add X to the first ( [0] index) square.
  // Calling setSquares lets React know the state of the component has changed. This will trigger a re-render of teh components that use the squares state (board) as well as its child components (squares).
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
