<script>
  import Letter from "./Letter.svelte";
  import { addLetter, removeLetter, removeAccents } from "./utils.js";
  import { FILLED, EMPTY, CORRECT, PRESENT, ABSENT, KEYS } from "./constants";
  export let solution = "";
  export let active = false;
  export let nextRow = () => {};
  export let winGame = () => {};

  let noAccentSolution = removeAccents(solution);

  let word = "";
  let tilesState = Array.from({ length: 5 }, () => FILLED);

  function submitWord() {
    const noAccentWord = removeAccents(word);
    const availableLetters = {};
    for (const letter of noAccentSolution) {
      if (letter in availableLetters) {
        availableLetters[letter] += 1;
      } else {
        availableLetters[letter] = 1;
      }
    }
    console.log(solution);
    for (let index = 0; index < noAccentSolution.length; index++) {
      const solutionLetter = noAccentSolution[index];
      const quessLetter = noAccentWord[index];

      if (solutionLetter === quessLetter) {
        tilesState[index] = CORRECT;
        availableLetters[solutionLetter] -= 1;
      } else if (
        quessLetter in availableLetters &&
        availableLetters[quessLetter] > 0
      ) {
        tilesState[index] = PRESENT;
        availableLetters[quessLetter] -= 1;
      } else {
        tilesState[index] = ABSENT;
      }
    }

    if (noAccentSolution === noAccentWord) winGame();
  }

  function handleKeyDown(e) {
    const { key } = e;
    // console.log(e);

    if (key === KEYS.BACKSPACE) {
      word = removeLetter(word);
    } else if (key === KEYS.ENTER && word.length === 5) {
      submitWord();
      nextRow();
    } else if (/^\p{L}$/u.test(key)) {
      word = addLetter(word, key).toLowerCase();
    }
  }

  $: if (active) {
    document.addEventListener("keydown", handleKeyDown);
  } else {
    document.removeEventListener("keydown", handleKeyDown);
  }
</script>

<div class="row">
  {#each tilesState as tileState, i}
    <Letter letter={word[i] || ""} tileState={word[i] ? tileState : EMPTY} />
  {/each}
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }
</style>
