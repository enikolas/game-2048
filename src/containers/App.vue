<template>
  <div class="App">
    <div class="cards">
      <button
        class="newGame"
        @click="newGame"
      >
        NEW GAME
      </button>

      <div class="score">
        SCORE
        <span>{{ score }}</span>
      </div>

      <div class="score">
        BEST
        <span>{{ best }}</span>
      </div>
    </div>
    
    <game-board
      :board="board"
    />

    <h1 :class="{ 'game-over': isGameOver }">
      Game Over
    </h1>
  </div>
</template>

<script>
import GameBoard from '../components/GameBoard.vue';
import {
  getNewBoard
} from '../business/gameLogic';
import {
  getBestScore,
  setBestScore
} from '../business/bestScore';

import Worker from '../workers/gameLogic.worker';

export default {
  name: 'App',
  components: {
    GameBoard
  },
  data: () => ({
    board: getNewBoard(),
    score: 0,
    isGameOver: false,
    worker: undefined
  }),
  computed: {
    best: function() {
      if (this.isGameOver) {
        setBestScore(this.score);
      }

      return getBestScore();
    }
  },
  created: function() {
    this.worker = new Worker();
    this.worker.addEventListener('message', ({
      data
    }) => {
      this.handleWorkerResponse(data);
    });

    document.addEventListener('keyup', (event) => {
      const keyName = event.key;

      switch (keyName) {
      case 'ArrowUp':
        this.handleUp();
        break;
      case 'ArrowLeft':
        this.handleLeft();
        break;
      case 'ArrowDown':
        this.handleDown();
        break;
      case 'ArrowRight':
        this.handleRight();
        break;
      default:
        return;
      }
    }, false);

    const unfinishedTouches = new Map();

    const handleStart = (event) => {
      const touches = event.changedTouches;
      for (let i=0; i<touches.length; i++) {
        const touch = touches[i];
        unfinishedTouches.set(touch.identifier, {
          screenX: touch.screenX,
          screenY: touch.screenY
        });
      }
    };

    const handleEnd = (event) => {
      const touches = event.changedTouches;
      for (let i=0; i<touches.length; i++) {
        const touch = touches[i];
        const startTouch = unfinishedTouches.get(touch.identifier);
        const deltaX = touch.screenX - startTouch.screenX;
        const deltaY = touch.screenY - startTouch.screenY;
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          const isRight = deltaX > 0;
          const isLeft = deltaX < 0;
          if (isRight) {
            this.handleRight();
          } else if (isLeft) {
            this.handleLeft();
          }
        } else {
          const isDown = deltaY > 0;
          const isUp = deltaY < 0;
          if (isDown) {
            this.handleDown();
          } else if (isUp) {
            this.handleUp();
          }
        }
        unfinishedTouches.delete(touch.identifier);
      }
    };

    const handleCancel = (event) => {
      const touches = event.changedTouches;
      for (let i=0; i<touches.length; i++) {
        const touch = touches[i];
        unfinishedTouches.delete(touch.identifier);
      }
    };

    window.addEventListener('touchstart', handleStart, false);
    window.addEventListener('touchend', handleEnd, false);
    window.addEventListener('touchcancel', handleCancel, false);
  },
  methods: {
    handleUp: function(value) {
      this.worker.postMessage({
        method: 'UP',
        board: this.board,
        score: this.score
      });
    },
    handleLeft: function(value) {
      this.worker.postMessage({
        method: 'LEFT',
        board: this.board,
        score: this.score
      });
    },
    handleDown: function(value) {
      this.worker.postMessage({
        method: 'DOWN',
        board: this.board,
        score: this.score
      });
    },
    handleRight: function(value) {
      this.worker.postMessage({
        method: 'RIGHT',
        board: this.board,
        score: this.score
      });
    },
    handleWorkerResponse: function(data) {
      const {
        board,
        score,
        isGameOver
      } = data;

      this.board = board;
      this.score = score;
      this.isGameOver = isGameOver;
    },
    newGame: function() {
      this.board = getNewBoard();
      this.score = 0;
      this.isGameOver = false;
    }
  }
};
</script>

<style scoped>
.App {
  max-width: 450px;
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
}

button {
  outline: none;
  border: none;
  color: #fff;
  font-size: 1.9rem;
  font-weight: bold;
  background-color: #5CC6C6;
  border-radius: 0.75rem;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
}

.cards {
  margin: 2rem 0;
  display: grid;
  grid-template: 1fr / 1fr 1.5fr 1.5fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  padding: 0.5rem;
}

.score {
  padding: 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  border-radius: 0.75rem;
  background-color: #546275;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
}

.score span {
  display: block;
  font-size: 2.75rem;
}

h1 {
  display: none;
}

h1.game-over {
  display: block;
  text-align: center;
  font-size: 5rem;
  font-weight: bold;
}

</style>
