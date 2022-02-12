<script>
  import WordRow from "./WordRow.svelte";
  import Keyboard from "./Keyboard.svelte";
  import { removeAccents } from "./utils.js";
  import { allWords } from "./slovakWords.js";
  let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase();
  let noAccentSolution = removeAccents(solution);
  let activeRow = 1;

  function looseGame() {
    alert(`prehral si. slovo bolo "${solution}"`);
  }

  function winGame() {
    alert("vyhral si");
    activeRow = 99;
  }

  function nextRow() {
    if (activeRow === 6) return looseGame();
    activeRow += 1;
  }
</script>

<main>
  <div>
    <span>{solution}</span>
    <span>{noAccentSolution}</span>
  </div>

  <div class="board">
    <WordRow {solution} active={activeRow === 1} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 2} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 3} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 4} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 5} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 6} {nextRow} {winGame} />
  </div>
  <Keyboard />
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
    height: 100vh;
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
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }
</style>
