<script>
  import Modal from "../Modal.svelte";
  import { generateBoardPreview } from "../../utils/common";
  import { gameStore } from "../../store";

  export let closeModal = () => {};
  export let gameReset = () => {};

  const { word } = $gameStore;
</script>

<Modal on:close={closeModal}>
  <h2 slot="header">Prehral si :(</h2>
  <div>slovo bolo: {word}</div>
  <button class="reset-button" slot="footer" on:click={gameReset}
    >Hraj znova</button
  >
</Modal>

<style>
  .reset-button {
    flex-grow: 1;
    background-color: #484848;
    color: white;
    border: none;
  }
</style>
