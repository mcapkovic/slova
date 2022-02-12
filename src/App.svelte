<script>
  import WordRow from "./WordRow.svelte";
  import Keyboard from "./Keyboard.svelte";
  import { allWords } from "./slovakWords.js";
  import { removeAccents } from "./utils.js";
  import { DEFAULT_GAME_STATE } from "./constants.js";

  let noAccentWords = allWords.map((x) => removeAccents(x));
  let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase();
  let activeRow = 1;
  let gameState = DEFAULT_GAME_STATE;

  function looseGame() {
    alert(`prehral si. slovo bolo "${solution}"`);
    activeRow = 99;
  }

  function winGame() {
    alert("vyhral si");
    activeRow = 99;
  }

  function nextRow(rowState) {
    gameState.words[activeRow - 1] = rowState.typedWord;
    gameState.validations[activeRow - 1] = rowState.tilesState;

    if (activeRow === 6) return looseGame();
    activeRow += 1;
  }
</script>

<main>
  <div>
    <button class="cheat" on:click={() => alert(solution)}
      >chcem podvadzat</button
    >
  </div>

  <div class="board">
    {#each [1, 2, 3, 4, 5, 6] as row, i}
      <WordRow
        {solution}
        {noAccentWords}
        active={activeRow === row}
        {nextRow}
        {winGame}
      />
    {/each}
  </div>
  <Keyboard {gameState} />
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

  main {
    height: 100%;
    color: white;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .cheat {
    background-color: transparent;
    color: rgb(185, 185, 185);
    border: none;
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
