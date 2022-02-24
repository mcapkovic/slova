<script>
  import Letter from "./Letter.svelte";
  import { notifications } from "./toast/notifications.js";
  import {
    addLetter,
    removeLetter,
    removeAccents,
    getGameState,
    isEnterKey,
    isBackspaceKey,
    isLetter,
    isRowSubmit,
    getDefaultTilesState,
    validateWord,
  } from "../utils/common.js";
  import { TILE_STATE } from "../utils/constants";
  import { gameStore } from "../store";

  export let solution = "";
  export let noAccentWords = [];
  export let active = false;
  export let nextRow = () => {};
  export let rowIndex = 0;

  const storedBoardState = $gameStore.boardState[rowIndex] || {};

  let noAccentSolution = removeAccents(solution);
  let typedWord = storedBoardState.typedWord || "";
  let tilesState = storedBoardState.tilesState || getDefaultTilesState();

  function submitWord() {
    const noAccentWord = removeAccents(typedWord);
    if (!noAccentWords.includes(noAccentWord))
      return notifications.default("Toto slovo nemam v slovniku", 1000);

    tilesState = validateWord(noAccentSolution, noAccentWord);
  
    const isWinner = noAccentSolution === noAccentWord;
    const isLoser = !isWinner && rowIndex === 5;
    if (isWinner) typedWord = solution;

    nextRow(isWinner, isLoser);

    gameStore.update((state) => {
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

    if (isEnterKey(key)) e.preventDefault();

    if (isBackspaceKey(key)) {
      typedWord = removeLetter(typedWord);
    } else if (isRowSubmit(key, typedWord.length)) {
      submitWord();
    } else if (isLetter(key)) {
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
      position={i}
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
