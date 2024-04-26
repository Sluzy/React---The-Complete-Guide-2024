import { useState } from "react"

import Player from "./Components/Player/Player"
import GameBoard from "./Components/GameBoard/GameBoard"
import Log from "./Components/Log/Log"
import GameOver from "./Components/GameOver/GameOver"
import { winningCombinations } from "./Components/WinningCombinations"

// Initial player names
const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
};

// Helper function for finding active player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  } return currentPlayer;
}

// Helper function for finding game winner
function deriveWinner(gameBoard, players) {
  let winner = null;

  for (let combination of winningCombinations) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secoundSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secoundSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player
  }
  return gameBoard;
}

// Initial gameboard
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// App function
function App() {

  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      },
      ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerNameChange}
            />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerNameChange}
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            activePlayerSymbol={activePlayer}
            turns={gameTurns}
            board={gameBoard}
          />
        </div>
        <Log
          turns={gameTurns}
        />
      </main>
    </>
  )
}

export default App