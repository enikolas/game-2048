import {
  handleRight,
  handleUp,
  handleLeft,
  handleDown,
  isGameOver
} from '../business/gameLogic';

self.addEventListener('message', ({
  data
}) => {
  const {
    method,
    board,
    score
  } = data;

  let newScore = score || 0;

  const addScore = (value) => {
    newScore += value;
  };

  let newBoard;
  switch (method) {
  case 'UP':
    newBoard = handleUp(board, addScore);
    break;
  case 'LEFT':
    newBoard = handleLeft(board, addScore);
    break;
  case 'DOWN':
    newBoard = handleDown(board, addScore);
    break;
  case 'RIGHT':
    newBoard = handleRight(board, addScore);
    break;
  default:
    newBoard = board;
  }

  postMessage({
    board: newBoard,
    score: newScore,
    isGameOver: isGameOver(newBoard)
  });
});
