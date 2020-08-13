<template>
  <div class="cell default" @click="onLeftClickHandler" @contextmenu.prevent="onRightClickHandler">
    <div v-if="isFlagged" class="flagged">🚩</div>
    <div v-if="isRevealed" class="revealed cover">
      <div v-if="isBomb || isLosingBomb" :class="{'losing-bomb': isLosingBomb}">💣</div>
      <div v-else-if="!isEmpty" class="text">{{cell.type}}</div>
    </div>
  </div>
</template>

<script>
  import TileTypes from "../assets/utils/TileTypes.js";

  export default {
    name: "Tile",
    props: ["cell", "flagTile", "revealTile"],
    data() {
      return {
        isBomb: this.cell.type === TileTypes.BOMB,
        isLosingBomb: this.cell.type === TileTypes.LOSING_BOMB,
        isEmpty: this.cell.type === TileTypes.EMPTY,
        isFlagged: this.cell.flagged,
        isRevealed: this.cell.revealed,
      };
    },
    methods: {
      onLeftClickHandler: function () {
        if (this.isFlagged) return;
        this.revealTile(this.cell.x, this.cell.y);
        return;
      },
      onRightClickHandler: function () {
        if (this.isRevealed) return;
        this.flagTile(this.cell.x, this.cell.y);
        return;
      },
    },
  };
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

  .cell {
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
    font-family: "Press Start 2P", cursive;
  }

  .default {
    background: url("../assets/images/default-cell.svg");
    background-size: contain;
  }

  .flagged {
    background: url("../assets/images/flagged-cell.svg");
    background-size: contain;
  }

  .revealed {
    background: url("../assets/images/revealed-cell.svg");
    background-size: contain;
    border: #a6acaf 1px solid;
  }

  .losing-bomb {
    background-color: #fd0000;
  }

  .cover {
    width: 100%;
    height: 100%;
  }

  .text {
    font-size: 20px;
  }
</style>