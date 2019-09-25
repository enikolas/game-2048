<template>
  <div class="GameBoard">
    <span
      v-for="(item, index) in displayBoard"
      :key="index"
      :class="numberClassName(item)"
    >
      {{ item }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GameBoard',
  props: {
    board: Array
  },
  computed: {
    displayBoard: function() {
      return this.board.map(box => box === 0 ? '' : box);
    }
  },
  methods: {
    numberClassName: function(item) {
      return item ? `number-${item}` : 'empty';
    }
  }
};
</script>

<style scoped>
.GameBoard {
  display: grid;
  grid-template: repeat(4, 8rem) / repeat(4, 1fr);
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  padding: 0.5rem;
}

span {
  padding-top: 2.2rem;
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  border-radius: 0.75rem;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
}

.empty {
  background-color: #eee;
}

.number-2 {
  background-color: #F6B75D;
}
.number-4 {
  background-color: #F3A32F;
}
.number-8 {
  background-color: #F18F01;
}
.number-16 {
  background-color: #5CC6C6;
}
.number-32 {
  background-color: #2EB6B6;
}
.number-64 {
  background-color: #00A6A6;
}
.number-128 {
  background-color: #F4DD61;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-256 {
  background-color: #F1D334;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-512 {
  background-color: #EFCA08;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-1024 {
  background-color: #7A8594;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-2048 {
  background-color: #546275;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-4096 {
  background-color: #2E4057;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-8192 {
  background-color: #AF5E9B;
  font-size: 2.5rem;
  padding-top: 2.5rem;
}
.number-16384 {
  background-color: #98307F;
  font-size: 2rem;
  padding-top: 2.8rem;
}
.number-32768 {
  background-color: #820263;
  font-size: 2rem;
  padding-top: 2.8rem;
}

</style>
