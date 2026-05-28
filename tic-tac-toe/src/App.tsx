import { useState } from 'react'

type Player = 'X' | 'O'
type Square = 'X' | 'O' | 'draw' | null

function App() {
  const [board, setBoard] = useState<Square[]>(
    Array(9).fill(null)
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Square>(null)

  const checkWinner = (board: Square[]): Square => {
    const combinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]

    for (const [a, b, c] of combinations) {
      if (
        board[a] !== null &&
        board[a] === board[b] &&
        board[b] === board[c]
      ) {
        return board[a]
      }
    }

    return null
  }                    // ← checkWinner closes here

  const handleClick = (index: number) => {
    if (board[index] !== null || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer

    const gameWinner = checkWinner(newBoard)

    setBoard(newBoard)
    setWinner(gameWinner)

    if (!gameWinner && newBoard.every(square => square !== null)) {
      setWinner('draw' as any)
      return
    }

    setWinner(gameWinner)

    if (!gameWinner) {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }                    // ← handleClick closes here

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {winner === 'draw'
        ? <h2>It's a Draw!</h2>
        : winner
          ? <h2>{winner} Wins!</h2>
          : <h2>{currentPlayer}'s Turn</h2>
      }
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: '8px'
      }}>
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '32px',
              cursor: 'pointer'
            }}
          >
            {square}
          </button>
        ))}
      </div>
      <button onClick={() => {
        setBoard(Array(9).fill(null))
        setCurrentPlayer('X')
        setWinner(null)
      }}>
        Reset
      </button>
    </div>
  )
}

export default App