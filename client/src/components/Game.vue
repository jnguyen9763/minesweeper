<template>
  <div class="center">
    <div class="board-layout margin">
      <div class="header">
        <FlagTracker :count="flagCount" />
        <ResetButton :face="face" :resetGame="resetGame" :key="gameState" />
        <Timer :seconds="seconds" />
      </div>
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
    <HighScores v-if="showHighScores" class="margin" />
    <WinScreen
      class="margin"
      v-if="showWinScreen"
      :seconds="seconds"
      :closeWinScreenAndShowHighScores="closeWinScreenAndShowHighScores"
    />
    <footer class="footer">Made by Jacqueline Nguyen</footer>
  </div>
</template>

<script>
  import Board from "./Board.vue";
  import ResetButton from "./ResetButton.vue";
  import FlagTracker from "./FlagTracker.vue";
  import Timer from "./Timer.vue";
  import HighScores from "./HighScores.vue";
  import WinScreen from "./WinScreen.vue";
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
        showHighScores: false,
        showWinScreen: false,
      };
    },
    components: {
      Board,
      ResetButton,
      FlagTracker,
      Timer,
      HighScores,
      WinScreen,
    },
    methods: {
      resetGame: function () {
        this.reset = !this.reset;
        this.gameState = GameStates.NORMAL;
        this.face = "🙂";
        this.flagCount = this.mines;
        this.seconds = 0;
        this.showHighScores = false;
        this.showWinScreen = false;
        this.stopTimer();
      },
      setGameState: function (gameState) {
        this.gameState = gameState;
        this.face = this.gameState === GameStates.GAME_WON ? "😎" : "😵";
        if (this.gameState === GameStates.GAME_LOST) this.showHighScores = true;
        if (this.gameState === GameStates.GAME_WON) this.showWinScreen = true;
      },
      closeWinScreenAndShowHighScores: function () {
        this.showWinScreen = false;
        this.showHighScores = true;
      },
      onMouseDownHandler: function (evt) {
        if (evt.which === 3 || this.gameState !== GameStates.NORMAL) return;
        this.gameState = GameStates.PICKED_TILE;
        this.face = "😮";
      },
      onMouseUpHandler: function () {
        if (this.gameState !== GameStates.PICKED_TILE) return;
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

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=News+Cycle&display=swap");

  .header {
    width: 400px;
    height: 64px;
    padding-bottom: 24px;
    display: flex;
  }

  .header > div {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .board-layout {
    background: url("../assets/images/layout.svg");
    background-size: contain;
    padding: 24px;
  }

  .center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5dade2;
  }

  .footer {
    font-family: "News Cycle", sans-serif;
    position: absolute;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 0.75rem;
    background-color: transparent;
    letter-spacing: 1px;
    bottom: 0;
  }

  .margin {
    margin: 0 0.5rem;
  }
</style>