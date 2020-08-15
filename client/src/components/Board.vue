<template>
  <div class="board">
    <div v-for="(row, rIndex) in board" :key="`r${rIndex}`">
      <Tile
        v-for="(cell, cIndex) in row"
        :key="`r${rIndex}c${cIndex}${flags}${moves}`"
        :cell="cell"
        :flagTile="flagTile"
        :revealTile="revealTile"
        :gameLost="gameLost"
        @mousedown="onMouseDownHandler"
        @mouseup="onMouseUpHandler"
        @click="onClickHandler"
      />
    </div>
  </div>
</template>

<script>
  import GameStates from "../assets/utils/GameStates.js";
  import TileTypes from "../assets/utils/TileTypes.js";
  import Tile from "./Tile.vue";

  export default {
    name: "Board",
    components: {
      Tile,
    },
    data() {
      return {
        board: this.createBoard(),
        flags: 0,
        moves: 0,
        gameLost: false,
        gameWon: false,
        totalTiles: this.width * this.height,
        startedTimer: false,
      };
    },
    props: [
      "width",
      "height",
      "mines",
      "setGameState",
      "onMouseDownHandler",
      "onMouseUpHandler",
      "setFlagCount",
      "startTimer",
      "stopTimer",
    ],
    methods: {
      onClickHandler: function () {
        if (this.startedTimer) return;
        this.startTimer();
        this.startedTimer = true;
      },
      flagTile: function (x, y) {
        if (this.gameLost || this.gameWon) return;
        const flagChange = !this.board[x][y].flagged;
        this.board[x][y].flagged = flagChange;
        if (flagChange) this.flags++;
        else this.flags--;
        this.setFlagCount(this.mines - this.flags);
      },
      revealTile: function (x, y) {
        if (this.gameLost || this.gameWon) return;
        if (this.board[x][y].type === TileTypes.EMPTY) {
          this.clearSurroundingEmptyTiles(x, y);
        } else {
          if (this.board[x][y].type === TileTypes.BOMB) {
            this.gameOver();
            this.board[x][y].type = TileTypes.LOSING_BOMB;
          }
          this.board[x][y].revealed = true;
          this.totalTiles--;
        }
        this.moves++;
        if (this.totalTiles === this.mines) this.checkWin();
      },
      clearSurroundingEmptyTiles: function (x, y) {
        this.board[x][y].revealed = true;
        this.totalTiles--;
        const neighbors = this.findNeighbors(this.board, x, y);
        for (let cell of neighbors) {
          if (cell.revealed) continue;
          if (cell.type === TileTypes.EMPTY)
            this.clearSurroundingEmptyTiles(cell.x, cell.y);
          else {
            this.board[cell.x][cell.y].revealed = true;
            this.totalTiles--;
          }
        }
      },
      checkWin: function () {
        let unrevealedBombs = this.mines;
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (
              this.board[i][j].type === TileTypes.BOMB &&
              !this.board[i][j].revealed
            ) {
              unrevealedBombs--;
            }
          }
        }
        if (!unrevealedBombs) this.winGame();
      },
      winGame: function () {
        this.gameWon = true;
        this.setGameState(GameStates.GAME_WON);
        setTimeout(() => {
          alert("You won!");
        }, 100);
        this.tagBombs("flag");
        this.stopTimer();
        this.setFlagCount(0);
        // enter high score
      },
      gameOver: function () {
        this.gameLost = true;
        this.setGameState(GameStates.GAME_LOST);
        setTimeout(() => {
          alert("You lost!");
        }, 100);
        this.tagBombs("reveal");
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (this.board[i][j].flagged) {
              this.board[i][j].type = TileTypes.WRONG;
              this.board[i][j].flagged = false;
            }
          }
        }
        this.stopTimer();
        // show high score screen
      },
      tagBombs: function (type) {
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (this.board[i][j].type !== TileTypes.BOMB) continue;
            if (type === "reveal") this.board[i][j].revealed = true;
            if (type === "flag") this.board[i][j].flagged = true;
          }
        }
      },
      createBoard: function () {
        const board = this.createEmptyBoard();
        this.plantMines(board);
        this.findNearbyMines(board);
        return board;
      },
      createEmptyBoard: function () {
        const board = new Array(this.height);

        for (let i = 0; i < this.height; i++) {
          board[i] = new Array(this.width);
          for (let j = 0; j < this.width; j++) {
            board[i][j] = {
              type: TileTypes.EMPTY,
              flagged: false,
              revealed: false,
              x: i,
              y: j,
            };
          }
        }

        return board;
      },
      plantMines: function (board) {
        let mines = this.mines;
        while (mines > 0) {
          const row = this.getRandomInt(0, this.height - 1);
          const col = this.getRandomInt(0, this.width - 1);

          if (board[row][col].type === TileTypes.BOMB) continue;
          board[row][col].type = TileTypes.BOMB;
          mines--;
        }
      },
      getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      findNearbyMines: function (board) {
        for (let i = 0; i < this.height; i++) {
          for (let j = 0; j < this.width; j++) {
            if (board[i][j].type !== TileTypes.EMPTY) continue;
            const neighbors = this.findNeighbors(board, i, j);
            const minesCount = neighbors.reduce(
              (acc, cell) => (cell.type === TileTypes.BOMB ? acc + 1 : acc),
              0
            );
            if (minesCount) board[i][j].type = minesCount;
          }
        }
      },
      findNeighbors: function (board, x, y) {
        const neighbors = new Array();
        const isTopEdge = x === 0;
        const isBottomEdge = x === this.height - 1;
        const isLeftEdge = y === 0;
        const isRightEdge = y === this.width - 1;

        if (!isLeftEdge) neighbors.push(board[x][y - 1]);
        if (!isRightEdge) neighbors.push(board[x][y + 1]);
        if (!isTopEdge) neighbors.push(board[x - 1][y]);
        if (!isBottomEdge) neighbors.push(board[x + 1][y]);
        if (!isLeftEdge && !isTopEdge) neighbors.push(board[x - 1][y - 1]);
        if (!isLeftEdge && !isBottomEdge) neighbors.push(board[x + 1][y - 1]);
        if (!isRightEdge && !isTopEdge) neighbors.push(board[x - 1][y + 1]);
        if (!isRightEdge && !isBottomEdge) neighbors.push(board[x + 1][y + 1]);

        return neighbors;
      },
    },
  };
</script>

<style scoped>
  .board {
    width: 500px;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
  }
</style>