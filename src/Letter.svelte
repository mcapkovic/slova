<script>
  import { getClassNames } from "./utils.js";
  export let letter;
  export let tileState;
</script>

<div
  class={getClassNames("tile", {
    filled: tileState === "FILLED",
    empty: tileState === "EMPTY",
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
    /* background-color: purple; */
  }

  .empty {
    border: 2px solid var(--tile-border-color);
  }

  .filled {
    /* background-color: GREEN; */
	border: 2px solid red
  }
</style>
