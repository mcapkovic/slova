<script>
  import { TILE_STATE, TILLE_DELAY } from "./constants";
  export let letter;
  export let tileState;
  export let position = 0;

  $: delay = tileState === TILE_STATE.FILLED ? 0 : TILLE_DELAY[position];
</script>

<div
  class="tile"
  class:filled={tileState === TILE_STATE.FILLED}
  class:empty={tileState === TILE_STATE.EMPTY}
  class:correct={tileState === TILE_STATE.CORRECT}
  class:present={tileState === TILE_STATE.PRESENT}
  class:absent={tileState === TILE_STATE.ABSENT}
  data-letter={letter}
  style="animation-delay: {delay}ms;"
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
    border: 2px solid var(--tile-border-color);
  }

  .filled,
  .correct,
  .present,
  .absent {
    border: 2px solid var(--tile-border-color-filled);
  }
  .correct,
  .present,
  .absent {
    animation-duration: 500ms;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .correct {
    animation-name: FlipTile, CorrectColor;
  }

  .present {
    animation-name: FlipTile, PresentColor;
  }

  .absent {
    animation-name: FlipTile, AbsentColor;
  }

  @keyframes CorrectColor {
    from {
      background-color: transparent;
    }
    50% {
      background-color: transparent;
    }
    to {
      background-color: var(--correct-color);
    }
  }

  @keyframes PresentColor {
    from {
      background-color: transparent;
    }
    50% {
      background-color: transparent;
    }
    to {
      background-color: var(--present-color);
    }
  }

  @keyframes AbsentColor {
    from {
      background-color: transparent;
    }
    50% {
      background-color: transparent;
    }
    to {
      background-color: var(--absent-color);
    }
  }

  @keyframes FlipTile {
    from {
      transform: rotateX(0);
      border: 2px solid var(--tile-border-color-filled);
    }
    50% {
      transform: rotateX(-90deg);
      border: 2px solid var(--tile-border-color-filled);
    }
    51% {
      border: none;
    }
    to {
      transform: rotateX(0);
      border: none;
    }
  }

  .filled[data-letter] {
    animation-name: PopIn;
    animation-duration: 100ms;
  }

  @keyframes PopIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }

    40% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
</style>
