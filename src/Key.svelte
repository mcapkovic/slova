<script>
  export let keyValue = "";
  export let flex = 1;

  const keySymbol = keyValue === "Backspace" ? "⌫" : keyValue;
  let buttonRef;

  function handleClick() {
    buttonRef.blur();
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: keyValue,
      })
    );
  }
</script>

<button on:click={handleClick} style={`flex: ${flex}`} bind:this={buttonRef}>
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
</style>
