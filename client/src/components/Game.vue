<template>
  <div>
    <FlagTracker :count="flagCount" />
    <ResetButton :face="face" :resetGame="resetGame" :key="gameState" />
    <Timer :seconds="seconds" />
    <Board
      :width="width"
      :height="height"
      :mines="mines"
      :setGameState="setGameState"
      :onMouseDownHandler="onMouseDownHandler"
      :onMouseUpHandler="onMouseUpHandler"
      :setFlagCount="setFlagCount"
      :startTimer="startTimer"
      :stopTimer="stopTimer"
      :key="reset"
    />
  </div>
</template>

<script>
  import Board from "./Board.vue";
  import ResetButton from "./ResetButton.vue";
  import FlagTracker from "./FlagTracker.vue";
  import Timer from "./Timer.vue";
  import GameStates from "../assets/utils/GameStates.js";

  export default {
    name: "Game",
    data() {
      return {
        width: 10,
        height: 10,
        mines: 10,
        flagCount: 10,
        gameState: GameStates.NORMAL,
        face: "🙂",
        reset: false,
        seconds: 0,
        interval: null,
      };
    },
    components: {
      Board,
      ResetButton,
      FlagTracker,
      Timer,
    },
    methods: {
      resetGame: function () {
        this.reset = !this.reset;
        this.gameState = GameStates.NORMAL;
        this.face = "🙂";
        this.flagCount = this.mines;
        this.seconds = 0;
        this.stopTimer();
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
      setFlagCount: function (count) {
        this.flagCount = count;
      },
      startTimer: function () {
        this.interval = setInterval(() => {
          this.seconds++;
        }, 1000);
      },
      stopTimer: function () {
        clearInterval(this.interval);
      },
    },
  };
</script>