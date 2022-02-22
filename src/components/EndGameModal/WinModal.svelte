<script>
  import Modal from "../Modal.svelte";
  import { generateBoardPreview } from "../../utils/common";
  import { gameStore } from "../../store";

  export let closeModal = () => {};
  export let gameReset = () => {};

  const { word, boardState = [] } = $gameStore;
  const sharableBoard = generateBoardPreview(boardState);
  const textToShare = `${word} ${boardState.length}/6\n${sharableBoard}`;
</script>

<Modal on:close={closeModal}>
  <h2 slot="header">Vyhral si! :)</h2>
  <pre>{textToShare}</pre>
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
  pre {
    text-align: center;
    font-size: 25px;
  }
</style>
