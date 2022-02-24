<script>
  import { KEY_STATE } from "../../utils/constants";

  export let boardState = [];
</script>

<div class="preview">
  {#each boardState as { tilesState }}
    {#each tilesState as keyState}
      <div
        class="tile"
        class:correct={keyState === KEY_STATE.CORRECT}
        class:present={keyState === KEY_STATE.PRESENT}
        class:absent={keyState === KEY_STATE.ABSENT}
      />
    {/each}
  {/each}
</div>

<style>
  .preview {
    display: grid;
    grid-template-columns: repeat(5, 3rem);
    grid-gap: 0.2rem;
  }

  .tile {
    border: 2px solid #e7e7e7;
    height: 3rem;
  }

  .correct {
    background-color: var(--correct-color);
  }

  .present {
    background-color: var(--present-color);
  }

  .absent {
    background-color: var(--absent-color);
  }
</style>
