<template>
  <div>
    <ResetButton :face="face" :resetGame="resetGame" :key="gameState" />
    <Board
      :width="width"
      :height="height"
      :mines="mines"
      :setGameState="setGameState"
      :onMouseDownHandler="onMouseDownHandler"
      :onMouseUpHandler="onMouseUpHandler"
      :key="reset"
    />
  </div>
</template>

<script>
  import Board from "./Board.vue";
  import ResetButton from "./ResetButton.vue";
  import GameStates from "../assets/utils/GameStates.js";

  export default {
    name: "Game",
    data() {
      return {
        width: 10,
        height: 10,
        mines: 10,
        gameState: GameStates.NORMAL,
        face: "🙂",
        reset: false,
      };
    },
    components: {
      Board,
      ResetButton,
    },
    methods: {
      resetGame: function () {
        this.reset = !this.reset;
        this.gameState = GameStates.NORMAL;
        this.face = "🙂";
      },
      setGameState: function (gameState) {
        this.gameState = gameState;
        this.face = this.gameState === GameStates.GAME_WON ? "😎" : "😵";
      },
      onMouseDownHandler: function (evt) {
        if (evt.which === 3) return;
        this.gameState = GameStates.PICKED_TILE;
        this.face = "😮";
      },
      onMouseUpHandler: function () {
        this.gameState = GameStates.NORMAL;
        this.face = "🙂";
      },
    },
  };
</script>