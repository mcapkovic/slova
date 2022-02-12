<script>
  import Key from "./Key.svelte";
  const keyboard = [
    ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "y", "x", "c", "v", "b", "n", "m", "Backspace"],
  ];
</script>

<div class="keyboard">
  <div class="row">
    {#each keyboard[0] as keyValue}
      <Key {keyValue} />
    {/each}
  </div>
  <div class="row">
    <div class="spacer" />
    {#each keyboard[1] as keyValue}
      <Key {keyValue} />
    {/each}
    <div class="spacer" />
  </div>
  <div class="row last-row">
    {#each keyboard[2] as keyValue, i}
      <Key
        {keyValue}
        flex={i === 0 || i === keyboard[2].length - 1 ? 1.5 : 1}
      />
    {/each}
  </div>
</div>

<style>
  .keyboard {
    width: 100%;
    max-width: 40rem;
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
