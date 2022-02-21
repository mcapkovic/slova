<script>
  import { getClassNames, getKeyState } from "./utils.js";
  import { KEY_STATE, DEFAULT_KEYBOARD_STATE } from "./constants.js";
  export let keyValue = "";
  export let flex = 1;
  export let keyboardState = DEFAULT_KEYBOARD_STATE;

  const keySymbol = keyValue === "Backspace" ? "⌫" : keyValue;

  $: keyState = getKeyState(keyValue, keyboardState);

  function handleClick() {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: keyValue,
      })
    );
  }
</script>

<button
  on:click={handleClick}
  style={`flex: ${flex}`}
  class={getClassNames("tile", {
    correct: keyState === KEY_STATE.CORRECT,
    present: keyState === KEY_STATE.PRESENT,
    absent: keyState === KEY_STATE.ABSENT,
  })}
>
  {keySymbol}
</button>

<style>
  button {
    margin: 0 0.2rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0.3rem;
    background-color: gray;
    color: white;
    height: 58px;
    padding: 0;
    border: none;
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
