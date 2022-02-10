<script>
  import Letter from "./Letter.svelte";
  import { addLetter, removeLetter } from "./utils.js";

  let word = "";
  let tilesState = Array.from({ length: 5 }, () => "DEFAULT");

  function handleKeyDown(e) {
    const { key } = e;
    console.log(e);

    if (key === "Backspace") {
      word = removeLetter(word);
    } else {
      word = addLetter(word, key);
    }
  }

  document.addEventListener("keydown", handleKeyDown);
</script>

<main on:keydown={handleKeyDown}>
  <div class="board">
    <div class="row">
      {#each tilesState as tileState, i}
        <Letter letter={word[i] || ""} {tileState} />
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

  main {
    height: 100vh;
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
