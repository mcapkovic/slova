<script>
  import { getClassNames } from "./utils.js";
  import { TILE_STATE } from "./constants";
  export let letter;
  export let tileState;
</script>

<div
  class={getClassNames("tile", {
    filled: tileState === TILE_STATE.FILLED,
    empty: tileState === TILE_STATE.EMPTY,
    correct: tileState === TILE_STATE.CORRECT,
    present: tileState === TILE_STATE.PRESENT,
    absent: tileState === TILE_STATE.ABSENT,
  })}
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
