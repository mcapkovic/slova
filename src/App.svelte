<script>
  import WordRow from "./WordRow.svelte";
  import Keyboard from "./Keyboard.svelte";
  import Toast from "./toast/Toast.svelte";
  import CheatButton from "./CheatButton.svelte";
  import { notifications } from "./toast/notifications.js";
  import { allWords } from "./slovakWords.js";
  import { removeAccents } from "./utils.js";
  import { DEFAULT_GAME_STATE } from "./constants.js";
  import { gameState } from "./store";

  const { boardState, word } = $gameState;
  let noAccentWords = allWords.map((x) => removeAccents(x));
  let solution =
    word || allWords[(allWords.length * Math.random()) | 0].toLowerCase();
  let activeRow = boardState.length || 0;

  function loseGame() {
    notifications.default(`Prehral si. Slovo bolo "${solution}"`, 5000);
    activeRow = 99;
  }

  function winGame() {
    notifications.default("Huraaa, vyhral si!", 1000);
    activeRow = 99;
  }

  function nextRow(isWinner, isLoser) {
    if (isWinner) return winGame();
    if (isLoser) return loseGame();
    activeRow += 1;
  }

  function gameReset() {
    gameState.set(DEFAULT_GAME_STATE);
    window.location.reload(false);
  }
</script>

<main>
  <header class="header">
    <CheatButton secret={solution} />
    <button on:click={gameReset}>reset game</button>
    <a href="https://www.nytimes.com/games/wordle/index.html"> original game</a>
  </header>
  <div class="board">
    {#each [0, 1, 2, 3, 4, 5] as rowIndex, i}
      <WordRow
        {solution}
        {noAccentWords}
        active={activeRow === rowIndex}
        {nextRow}
        {rowIndex}
      />
    {/each}
  </div>
  <Keyboard />
  <Toast />
</main>

<style>
  :global(html) {
    box-sizing: border-box;
  }
  :global(*),
  :global(*:before),
  :global(*:after) {
    box-sizing: inherit;
  }

  :global(:root) {
    --header-color: purple;
    --tile-text-color: #ffffff;
    --tile-border-color: #3a3a3c;
    --tile-border-color-filled: #565758;
    --absent-color: #3a3a3c;
    --correct-color: #538d4e;
    --present-color: #b59f3b;
    --background-color: #121213;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;
  }
  main {
    height: 100%;
    color: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .board {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    width: 350px;
    height: 417px;
    padding: 10px;
  }
</style>
