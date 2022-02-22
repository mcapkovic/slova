<script>
  import WordRow from "./components/WordRow.svelte";
  import Keyboard from "./components/Keyboard.svelte";
  import Toast from "./components/toast/Toast.svelte";
  import CheatButton from "./components/CheatButton.svelte";
  import EndGameModal from "./components/EndGameModal.svelte";

  import { allWords } from "./utils/slovakWords.js";
  import { removeAccents } from "./utils/utils.js";
  
  import { gameStore } from "./store";

  const { boardState, word } = $gameStore;
  let noAccentWords = allWords.map((x) => removeAccents(x));
  let solution =
    word || allWords[(allWords.length * Math.random()) | 0].toLowerCase();
  let activeRow = boardState.length || 0;

  function nextRow(isWinner, isLoser) {
    if (isWinner || isLoser) return (activeRow = 99);
    activeRow += 1;
  }
</script>

<main>
  <header class="header">
    <CheatButton secret={solution} />
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
  <EndGameModal />
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
    --key-color: gray;
    --absent-color: #3a3a3c;
    --correct-color: #538d4e;
    --present-color: #b59f3b;
    --background-color: #121213;
    --modal-bg-color: #202020;
    --text-color: #ffffff;
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
