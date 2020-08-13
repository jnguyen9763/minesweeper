<template>
  <div class="board">
    <div v-for="(row, rIndex) in board" :key="`r${rIndex}`">
      <Tile
        v-for="(cell, cIndex) in row"
        :key="`r${rIndex}c${cIndex}${flags}${moves}`"
        :cell="cell"
        :flagTile="flagTile"
        :revealTile="revealTile"
      />
    </div>
  </div>
</template>

<script>
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
      };
    },
    props: ["width", "height", "mines", "gameOver"],
    methods: {
      flagTile: function (x, y) {
        const flagChange = !this.board[x][y].flagged;
        this.board[x][y].flagged = flagChange;
        if (flagChange) this.flags++;
        else this.flags--;
      },
      revealTile: function (x, y) {
        if (this.board[x][y].type === TileTypes.EMPTY) {
          this.clearSurroundingEmptyTiles(x, y);
        }
        this.board[x][y].revealed = true;
        this.moves++;
        // if (this.board[x][y].type === TileTypes.BOMB) alert("Game over");
      },
      clearSurroundingEmptyTiles: function (x, y) {
        this.board[x][y].revealed = true;
        const neighbors = this.findNeighbors(this.board, x, y);
        for (let cell of neighbors) {
          if (cell.revealed) continue;
          if (cell.type === TileTypes.EMPTY)
            this.clearSurroundingEmptyTiles(cell.x, cell.y);
          else this.board[cell.x][cell.y].revealed = true;
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
            const minesCount = neighbors.reduce((acc, cell) => {
              if (cell.type === TileTypes.BOMB) return acc + 1;
              return acc;
            }, 0);
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
    watch: {
      moves: function () {
        console.log(this.moves);
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