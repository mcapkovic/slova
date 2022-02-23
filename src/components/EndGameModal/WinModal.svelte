<script>
  import Modal from "../Modal.svelte";
  import { generateBoardPreview, saveToClipboard } from "../../utils/common";
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

  <svelte:fragment slot="footer">
    <button class="footer-button reset-button" on:click={gameReset}
      >Hraj znova</button
    >
    <button class="footer-button share-button" on:click={saveToClipboard}
      >Zdieľať</button
    >
  </svelte:fragment>
</Modal>

<style>
  .footer-button {
    color: white;
    border: none;
    flex-grow: 1;
  }
  .reset-button {
    background-color: #484848;
  }

  .share-button {
    background-color: var(--correct-color);
  }

  pre {
    text-align: center;
    font-size: 25px;
  }
</style>
