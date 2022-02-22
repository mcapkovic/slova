<script>
  import Modal from "./Modal.svelte";
  import {
    DEFAULT_GAME_STATE,
    GAME_STATE,
    END_GAME_DIALOG_DELAY,
  } from "../utils/constants.js";
  import { generateBoardPreview } from "../utils/common";
  import { gameStore } from "../store";

  let modalType = "";
  $: ({ gameState, word, boardState = [] } = $gameStore);

  // open the modal if the game is won or lost
  $: if (gameState === GAME_STATE.WIN || gameState === GAME_STATE.LOSE) {
    setTimeout(() => {
      modalType = gameState;
    }, END_GAME_DIALOG_DELAY);
  }

  function gameReset() {
    gameStore.set(DEFAULT_GAME_STATE);
    window.location.reload(false);
  }
</script>

{#if modalType === GAME_STATE.WIN}
  <Modal on:close={() => (modalType = "")}>
    <h2 slot="header">Vyhral si :)</h2>
    <pre>{generateBoardPreview(boardState)}</pre>
    <button class="reset-button" slot="footer" on:click={gameReset}
      >Hraj znova</button
    >
  </Modal>
{/if}

{#if modalType === GAME_STATE.LOSE}
  <Modal on:close={() => (modalType = "")}>
    <h2 slot="header">Prehral si :(</h2>
    <div>slovo bolo: {word}</div>
    <button class="reset-button" slot="footer" on:click={gameReset}
      >Hraj znova</button
    >
  </Modal>
{/if}

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
