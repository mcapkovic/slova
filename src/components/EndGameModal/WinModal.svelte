<script>
  import Modal from "../Modal.svelte";
  import { generateBoardPreview, saveToClipboard } from "../../utils/common";
  import { gameStore } from "../../store";
  import BoardPreview from "./BoardPreview.svelte";

  export let closeModal = () => {};
  export let gameReset = () => {};

  const { word, boardState = [] } = $gameStore;
  const sharableBoard = generateBoardPreview(boardState);
  const title = `${word} ${boardState.length}/6`;
  const textToShare = `${title}\n${sharableBoard}`;
</script>

<Modal on:close={closeModal}>
  <h2 slot="header">Vyhral si! :)</h2>

  <div class="content">
    <p>{title}</p>
    <BoardPreview {boardState} />
  </div>

  <svelte:fragment slot="footer">
    <button class="footer-button reset-button" on:click={gameReset}
      >Hraj znova</button
    >
    <button
      class="footer-button share-button"
      on:click={() => saveToClipboard(textToShare)}>Zdieľať</button
    >
  </svelte:fragment>
</Modal>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content p {
    margin-top: 0;
  }
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
</style>
