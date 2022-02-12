<script>
  import WordRow from "./WordRow.svelte";

  import Letter from "./Letter.svelte";
  import { addLetter, removeLetter, removeAccents } from "./utils.js";
  import { allWords } from "./slovakWords.js";
  import { FILLED, EMPTY, CORRECT, PRESENT, ABSENT } from "./constants";
  const noAccentWords = allWords.map((x) => removeAccents(x));
  let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase();
  // const solution ='zápač'
  let noAccentSolution = removeAccents(solution);

  let lastPressedKey = "";
  let activeRow = 1;

  function nextRow() {
    if(activeRow === 6) return alert('done')
    activeRow += 1;
  }

  function winGame(){
    alert('yout won')
    activeRow = 99;
  }

  function handleKeyDown(e) {
    lastPressedKey = e.key;
  }

  document.addEventListener("keydown", handleKeyDown);
</script>

<main>
  <span>{solution}</span>
  <span>{noAccentSolution}</span>
  <div class="board">
    <WordRow {solution} active={activeRow === 1} {nextRow} {winGame} />
    <WordRow {solution} active={activeRow === 2} {nextRow} {winGame}/>
    <WordRow {solution} active={activeRow === 3} {nextRow} {winGame}/>
    <WordRow {solution} active={activeRow === 4} {nextRow} {winGame}/>
    <WordRow {solution} active={activeRow === 5} {nextRow} {winGame}/>
    <WordRow {solution} active={activeRow === 6} {nextRow} {winGame}/>

  </div>
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
