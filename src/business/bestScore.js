const storageAvailable = () => {
  try {
    const x = '__storage-test__';
    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
};

let bestScore = 0;
const isStorageAvailable = storageAvailable();
const bestScoreKey = '__best-score__';

export const getBestScore = () => {
  if (!isStorageAvailable) {
    return bestScore;
  }

  return window.localStorage.getItem(bestScoreKey) || 0;
};

export const setBestScore = (score) => {
  if (!isStorageAvailable) {
    if (bestScore < score) {
      bestScore = score;
    }
  } else if (window.localStorage.getItem(bestScore) < score) {
    window.localStorage.setItem(bestScoreKey, score);
  }
};
