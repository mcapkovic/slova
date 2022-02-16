<script>
  import Letter from "./Letter.svelte";
  import { notifications } from "./toast/notifications.js";
  import {
    addLetter,
    removeLetter,
    removeAccents,
    getGameState,
  } from "./utils.js";
  import { KEYS, TILE_STATE } from "./constants";
  import { gameState } from "./store";

  export let solution = "";
  export let noAccentWords = [];
  export let active = false;
  export let nextRow = () => {};
  export let rowIndex = 0;

  const storedBoardState = $gameState.boardState[rowIndex] || {};

  let noAccentSolution = removeAccents(solution);
  let typedWord = storedBoardState.typedWord || "";
  let tilesState =
    storedBoardState.tilesState ||
    Array.from({ length: 5 }, () => TILE_STATE.FILLED);

  console.log(storedBoardState);

  function submitWord() {
    const noAccentWord = removeAccents(typedWord);
    if (!noAccentWords.includes(noAccentWord))
      return notifications.default("Toto slovo nemam v slovniku", 1000);

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

    const isWinner = noAccentSolution === noAccentWord;
    const isLoser = !isWinner && rowIndex === 5;
    if (isWinner) typedWord = solution;

    nextRow(isWinner, isLoser);

    gameState.update((state) => {
      const newBoardState = [...state.boardState];
      newBoardState[rowIndex] = {
        tilesState,
        typedWord: isWinner ? solution : typedWord,
        noAccentWord,
      };
      return {
        ...state,
        word: solution,
        gameState: getGameState(isWinner, isLoser),
        boardState: newBoardState,
      };
    });
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
    <Letter
      letter={typedWord[i] || ""}
      tileState={typedWord[i] ? tileState : TILE_STATE.EMPTY}
    />
  {/each}
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }
</style>
