<template>
  <div class="highscores">
    <div class="header">HIGHSCORES</div>
    <div class="table">
      <div class="table-header row">
        <div class="place"></div>
        <div class="name">Name</div>
        <div class="score">Score</div>
      </div>
      <div class="table-body">
        <div
          v-for="(highscore, index) of highscores"
          class="row"
          :class="{'light-gray': index % 2 === 0}"
          :key="index"
        >
          <div class="place">{{index + 1}}.</div>
          <div class="name">{{highscore.name}}</div>
          <div class="score">{{highscore.highscore}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "HighScores",
    data() {
      return {
        highscores: null,
      };
    },
    mounted() {
      axios
        .get("/highscores")
        .then((response) => (this.highscores = response.data));
    },
    watch: {
      highscores: function () {
        this.highscores.sort((a, b) => {
          if (a.highscore < b.highscore) {
            return -1;
          } else if (a.highscore > b.highscore) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      },
    },
  };
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .highscores {
    width: 448px;
    height: 512px;
    background: url("../assets/images/highscores-panel.svg");
    background-size: contain;
    padding: 24px;
  }

  .header {
    width: 400px;
    height: 64px;
    padding-bottom: 24px;
    line-height: 40px;
    font-size: 36px;
    text-align: center;
  }

  .table {
    width: 400px;
    height: 400px;
  }

  .table-header {
    height: 40px;
    padding: 0.5rem 0;
    font-weight: bold;
  }

  .table-body {
    height: 360px;
    overflow-y: scroll;
  }

  .row {
    display: flex;
  }

  .row > div {
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .place {
    flex: 1;
  }

  .name {
    flex: 3;
  }

  .score {
    flex: 2;
  }

  .light-gray {
    background-color: #d7dbdd;
  }
</style>