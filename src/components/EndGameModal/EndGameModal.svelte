<script>
  import {
    DEFAULT_GAME_STATE,
    GAME_STATE,
    END_GAME_DIALOG_DELAY,
  } from "../../utils/constants.js";
  import { gameStore } from "../../store";
  import LoseModal from "./LoseModal.svelte";
  import WinModal from "./WinModal.svelte";

  let modalType = "";
  $: ({ gameState } = $gameStore);

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
  <WinModal closeModal={() => (modalType = "")} {gameReset} />
{/if}

{#if modalType === GAME_STATE.LOSE}
  <LoseModal closeModal={() => (modalType = "")} {gameReset} />
{/if}
