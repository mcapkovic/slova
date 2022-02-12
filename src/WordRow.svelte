<script>
  import Letter from "./Letter.svelte";
  import { addLetter, removeLetter, removeAccents } from "./utils.js";
  import { KEYS, TILE_STATE } from "./constants";
  export let solution = "";
  export let noAccentWords = [];
  export let active = false;
  export let nextRow = () => {};
  export let winGame = () => {};

  let noAccentSolution = removeAccents(solution);
  let typedWord = "";
  let tilesState = Array.from({ length: 5 }, () => TILE_STATE.FILLED);

  function submitWord() {
    const noAccentWord = removeAccents(typedWord);
    if(!noAccentWords.includes(noAccentWord)) return alert('toto slovo nemam v slovniku')

    const availableLetters = {};
    for (const letter of noAccentSolution) {
      if (letter in availableLetters) {
        availableLetters[letter] += 1;
      } else {
        availableLetters[letter] = 1;
      }
    }

    for (let index = 0; index < noAccentSolution.length; index++) {
      const solutionLetter = noAccentSolution[index];
      const quessLetter = noAccentWord[index];
      if (solutionLetter === quessLetter) {
        tilesState[index] = TILE_STATE.CORRECT;
        availableLetters[solutionLetter] -= 1;
      } else {
        tilesState[index] = TILE_STATE.ABSENT;
      }
    }

    for (let index = 0; index < noAccentSolution.length; index++) {
      const solutionLetter = noAccentSolution[index];
      const quessLetter = noAccentWord[index];
      if (solutionLetter === quessLetter) continue;
      if (!(quessLetter in availableLetters)) continue;
      if (availableLetters[quessLetter] < 1) continue;
      tilesState[index] = TILE_STATE.PRESENT;
      availableLetters[quessLetter] -= 1;
    }
    nextRow();
    if (noAccentSolution !== noAccentWord) return
    typedWord = solution
    winGame();
  }

  function handleKeyDown(e) {
    const { key } = e;

    if (key === KEYS.BACKSPACE) {
      typedWord = removeLetter(typedWord);
    } else if (key === KEYS.ENTER && typedWord.length === 5) {
      submitWord();
    } else if (/^\p{L}$/u.test(key)) {
      typedWord = addLetter(typedWord, key).toLowerCase();
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
    <Letter letter={typedWord[i] || ""} tileState={typedWord[i] ? tileState : TILE_STATE.EMPTY} />
  {/each}
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }
</style>
