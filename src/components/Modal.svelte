<!-- modal is from https://svelte.dev/examples/modal -->
<script>
  import { createEventDispatcher, onDestroy } from "svelte";
  import { fly, fade } from "svelte/transition";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  let modal;

  const handle_keydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "Tab") {
      // trap focus
      const nodes = modal.querySelectorAll("*");
      const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused =
    typeof document !== "undefined" && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
</script>

<svelte:window on:keydown={handle_keydown} />

<div
  class="modal-background"
  on:click={close}
  transition:fade={{ duration: 100 }}
/>

<div
  class="modal"
  role="dialog"
  aria-modal="true"
  bind:this={modal}
  transition:fly={{ y: 30 }}
>
  <div class="header"><slot name="header" /></div>
  <div class="content"><slot /></div>
  <div class="modal-footer"><slot name="footer" /></div>

  <!-- svelte-ignore a11y-autofocus -->
  <button class="close-button" autofocus on:click={close}>✕</button>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.4em;
    background: var(--modal-bg-color);
    color: var(--text-color);
  }

  .content {
    padding-bottom: 1em;
  }

  .modal-footer {
    display: flex;
  }

  :global(.modal-footer > * + *) {
    margin-left: 0.5rem;
  }

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: var(--text-color);
    background-color: transparent;
    border: none;
  }

  .close-button:active {
    background-color: transparent;
  }
</style>
