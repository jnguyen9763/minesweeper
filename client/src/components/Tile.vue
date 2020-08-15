<template>
  <div class="cell default" @click="onLeftClickHandler" @contextmenu.prevent="onRightClickHandler">
    <div v-if="isWrong" class="flagged">❌</div>
    <div
      v-else-if="(!gameLost && isFlagged) || (gameLost && isFlagged && !isBomb)"
      class="flagged"
    >🚩</div>
    <div v-else-if="isRevealed" class="revealed cover">
      <div v-if="isBomb || isLosingBomb" :class="{'losing-bomb': isLosingBomb}">💣</div>
      <div v-else-if="!isEmpty" class="text" :style="{color: textColor}">{{cell.type}}</div>
    </div>
  </div>
</template>

<script>
  import TileTypes from "../assets/utils/TileTypes.js";
  import TileColors from "../assets/utils/TileColors.js";

  export default {
    name: "Tile",
    props: ["cell", "flagTile", "revealTile", "gameLost"],
    data() {
      return {
        isBomb: this.cell.type === TileTypes.BOMB,
        isLosingBomb: this.cell.type === TileTypes.LOSING_BOMB,
        isEmpty: this.cell.type === TileTypes.EMPTY,
        isWrong: this.cell.type === TileTypes.WRONG,
        isFlagged: this.cell.flagged,
        isRevealed: this.cell.revealed,
        textColor:
          this.cell.type !== TileTypes.BOMB && this.cell.type !== TileTypes.EMPTY
            ? TileColors[this.cell.type]
            : "",
      };
    },
    methods: {
      onLeftClickHandler: function () {
        if (this.isFlagged || this.isRevealed) return;
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

<style>
  .cell {
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 25px;
    text-align: center;
  }

  .default {
    background: url("../assets/images/default-cell.svg");
    background-size: contain;
  }

  .revealed {
    background: url("../assets/images/revealed-cell.svg");
    background-size: contain;
    border: #a6acaf 1px solid;
  }
</style>

<style scoped>
  .flagged {
    background: url("../assets/images/flagged-cell.svg");
    background-size: contain;
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