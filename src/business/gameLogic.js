export const mapToRows = (board) => {
  const rowLength = Math.sqrt(board.length);
  const output = new Array(rowLength);
  for(let row=0; row<rowLength; row++) {
    for(let col=0; col<rowLength; col++) {
      if (col === 0) {
        output[row] = new Array(rowLength);
      }

      output[row][col] = board[(row*rowLength) + col];
    }
  }

  return output;
};

export const mapToColumns = (board) => {
  const colLength = Math.sqrt(board.length);
  const output = new Array(colLength);
  for(let row=0; row<colLength; row++) {
    for(let col=0; col<colLength; col++) {
      if (row === 0) {
        output[col] = new Array(colLength);
      }

      output[col][row] = board[(row*colLength) + col];
    }
  }

  return output;
};

export const moveRight = (row) => {
  const targetLength = row.length;
  const output = [...row];

  for (let i=0; i<targetLength; i++) {
    for (let j=0; j<targetLength-1; j++) {
      const box = output[j];
      const nextBox = output[j+1];

      if (nextBox === 0) {
        output[j+1] = box;
        output[j] = 0;
      }
    }
  }

  return output;
};

export const mergeRight = (row, addScore) => {
  const targetLength = row.length;
  const output = [...row];

  for (let i=targetLength-1; i>0; i--) {
    const box = output[i];
    const prevBox = output[i-1];

    if (prevBox === box) {
      const newValue = box * 2;
      output[i] = newValue;
      output[i-1] = 0;
      addScore(newValue);
    }
  }

  return moveRight(output);
};

export const moveLeft = (row) => {
  const targetLength = row.length;
  const output = [...row];

  for (let i=targetLength-1; i>=0; i--) {
    for (let j=targetLength-1; j>0; j--) {
      const box = output[j];
      const prevBox = output[j-1];

      if (prevBox === 0) {
        output[j-1] = box;
        output[j] = 0;
      }
    }
  }

  return output;
};

export const mergeLeft = (row, addScore) => {
  const targetLength = row.length;
  const output = [...row];

  for (let i=0; i<targetLength; i++) {
    const box = output[i];
    const nextBox = output[i+1];

    if (nextBox === box) {
      const newValue = box * 2;
      output[i] = newValue;
      output[i+1] = 0;
      addScore(newValue);
    }
  }

  return moveLeft(output);
};

export const handleUp = (board, addScore) => {
  const inverseBoard = mapToColumns(board)
    .flatMap(row => mergeLeft(moveLeft(row), addScore));
  const moveCompleted = mapToColumns(inverseBoard).flat();

  if (board.toString() === moveCompleted.toString()) {
    return board;
  }

  return spawnNewBoxFactory({rndFn: getRandomInt})(moveCompleted);
};

export const handleRight = (board, addScore) => {
  const moveCompleted = mapToRows(board)
    .flatMap(row => mergeRight(moveRight(row), addScore));

  if (board.toString() === moveCompleted.toString()) {
    return board;
  }
  return spawnNewBoxFactory({rndFn: getRandomInt})(moveCompleted);
};

export const handleDown = (board, addScore) => {
  const inverseBoard = mapToColumns(board)
    .flatMap(row => mergeRight(moveRight(row), addScore));
  const moveCompleted = mapToColumns(inverseBoard).flat();

  if (board.toString() === moveCompleted.toString()) {
    return board;
  }

  return spawnNewBoxFactory({rndFn: getRandomInt})(moveCompleted);
};

export const handleLeft = (board, addScore) => {
  const moveCompleted = mapToRows(board)
    .flatMap(row => mergeLeft(moveLeft(row), addScore));

  if (board.toString() === moveCompleted.toString()) {
    return board;
  }
  return spawnNewBoxFactory({rndFn: getRandomInt})(moveCompleted);
};

const getRandomInt = (max = 2) => {
  const min = 1;
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const spawnNewBox = (
  {
    rndFn
  },
  board
) => {
  const emptyBoxesIndex = [];

  board.forEach((box, index) => {
    if (box === 0) {
      emptyBoxesIndex.push(index);
    }
  });

  if (!emptyBoxesIndex.length) {
    return board;
  }
  const boxValue = rndFn() * 2;

  let targetIndex;
  if (emptyBoxesIndex.length === 1) {
    targetIndex = emptyBoxesIndex[0];
  } else {
    const rndIndex = rndFn(emptyBoxesIndex.length) - 1;
    targetIndex = emptyBoxesIndex[rndIndex];
  }

  return [
    ...board.slice(0, targetIndex),
    boxValue,
    ...board.slice(targetIndex + 1)
  ];
};

export const spawnNewBoxFactory =
  dependency => spawnNewBox.bind(null, dependency);

export const getNewBoard = (lineLength = 4) => {
  const board = [];
  const boardSize = lineLength * lineLength;
  for (let i=0; i<boardSize; i++) {
    board.push(0);
  }
  return spawnNewBoxFactory({rndFn: getRandomInt})(board);
};

export const isGameOver = (board) => {
  const hasEmptySpace = board.some(box => box === 0);

  if (hasEmptySpace) {
    return false;
  }

  const canMoveHorizontally = handleRight(board, () => {}) !== board;

  if (canMoveHorizontally) {
    return false;
  }
  
  const canMoveVertically = handleDown(board, () => {}) !== board;

  if (canMoveVertically) {
    return false;
  }

  return true;
};
