<script>
  import Key from "./Key.svelte";
  import { DEFAULT_GAME_STATE, DEFAULT_KEYBOARD_STATE } from "./constants.js";
  import { getKeysState } from "./utils";
  import { gameStore } from "./store";

  $:boardState  = $gameStore.boardState || DEFAULT_GAME_STATE.boardState ;

  let keysState = DEFAULT_KEYBOARD_STATE;
  const rows = [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "y", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];

  $: keysState = getKeysState(boardState);
</script>

<div class="keyboard">
  <div class="row">
    {#each rows[0] as keyValue}
      <Key {keyValue} keyboardState={keysState} />
    {/each}
  </div>

  <div class="row">
    <div class="spacer" />
    {#each rows[1] as keyValue}
      <Key {keyValue} keyboardState={keysState} />
    {/each}
    <div class="spacer" />
  </div>

  <div class="row last-row">
    {#each rows[2] as keyValue, i}
      <Key
        {keyValue}
        flex={i === 0 || i === rows[2].length - 1 ? 1.5 : 1}
        keyboardState={keysState}
      />
    {/each}
  </div>
</div>

<style>
  .keyboard {
    width: 100%;
    max-width: 40rem;
    touch-action: manipulation;
    margin-bottom: 1rem;
  }

  .row {
    display: flex;
    justify-content: center;
    margin-bottom: 0.3rem;
  }

  .spacer {
    flex: 0.5;
  }
</style>
