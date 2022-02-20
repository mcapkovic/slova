<script>
  import { TILE_STATE } from "./constants";
  export let letter;
  export let tileState;
</script>

<div
  class="tile"
  class:actfilledive={tileState === TILE_STATE.FILLED}
  class:filled={tileState === TILE_STATE.FILLED}
  class:empty={tileState === TILE_STATE.EMPTY}
  class:correct={tileState === TILE_STATE.CORRECT}
  class:present={tileState === TILE_STATE.PRESENT}
  class:absent={tileState === TILE_STATE.ABSENT}
>
  {letter || ""}
</div>

<style>
  .tile {
    font-size: 2rem;
    line-height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--tile-text-color);
    text-transform: uppercase;
    user-select: none;
  }

  .empty {
    border: 2px solid var(--tile-border-color);
  }

  .filled {
    border: 2px solid var(--tile-border-color-filled);
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
