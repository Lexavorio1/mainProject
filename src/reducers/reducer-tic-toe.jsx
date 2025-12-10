const initialTicState = {
  cells: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'X',
  isGameEnded: false,
  isDraw: false
}

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const checkIsGameEnded = (cells) => {
  for (let pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return true;
    }
  }
  return false;
}

const checkDraw = (cells) => {
  return cells.every(cell => cell !== '')
}

export const reducerTic = (state = initialTicState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLAYER': {
      if (state.cells[action.payload] || state.isGameEnded || state.isDraw) {
        return state
      }
      
      const newCells = [...state.cells]
      newCells[action.payload] = state.currentPlayer
      
      const isGameEnded = checkIsGameEnded(newCells)
      const isDraw = !isGameEnded && checkDraw(newCells)
      
      return {
        ...state,
        cells: newCells,
        currentPlayer: isGameEnded || isDraw ? state.currentPlayer : state.currentPlayer === 'X' ? 'O' : 'X',
        isGameEnded,
        isDraw
      }
    }
    case 'RESTART_GAME':
      return initialTicState;
      
    default:
      return state;
  }
}