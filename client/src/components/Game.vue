<template>
  <Board :width="width" :height="height" :mines="mines" :gameOver="gameOver" />
</template>

<script>
  import Board from "./Board.vue";

  export default {
    name: "Game",
    data() {
      return {
        width: 10,
        height: 10,
        mines: 10,
        gameOver: false,
      };
    },
    components: {
      Board,
    },
  };
</script>