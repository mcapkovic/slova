<script>
  import { notifications } from "./toast/notifications.js";

  export let secret = "";

  let counter = 0;

  function handleClick() {
    counter += 1;
    if (counter === 10) {
      notifications.default(secret, 1000);
      counter = 0;
    }
  }
</script>

<button on:click={handleClick} />

<style>
  button {
    all: unset;
    cursor: default;
    height: 100%;
    width: 2rem;
    touch-action: manipulation;
    
  }
  button:active {
    background-color: transparent;
    cursor: default;
  }
</style>
