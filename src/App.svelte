<script>
  import Letter from "./Letter.svelte";
  import { addLetter, removeLetter, removeAccents } from "./utils.js";
  import { allWords } from "./slovakWords.js";
  import { FILLED, EMPTY, CORRECT, PRESENT, ABSENT } from "./constants";
  const noAccentWords = allWords.map((x) => removeAccents(x));
  let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase();
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
  }

  function handleKeyDown(e) {
    const { key } = e;
    // console.log(e);

    if (key === "Backspace") {
      word = removeLetter(word);
    } else if (key === "Enter" && word.length === 5) {
      submitWord();
    } else if (/^\p{L}$/u.test(key)) {
      word = addLetter(word, key).toLowerCase();
    }
  }

  document.addEventListener("keydown", handleKeyDown);
</script>

<main on:keydown={handleKeyDown}>
  <span>{solution}</span>
  <span>{noAccentSolution}</span>
  <div class="board">
    <div class="row">
      {#each tilesState as tileState, i}
        <Letter
          letter={word[i] || ""}
          tileState={word[i] ? tileState : EMPTY}
        />
      {/each}
    </div>
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
