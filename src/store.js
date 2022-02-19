import { writable } from "svelte/store";
import { DEFAULT_GAME_STATE } from "./constants.js";

const storedGameStore = JSON.parse(localStorage.getItem("gameStore"));
export const gameStore = writable(storedGameStore || DEFAULT_GAME_STATE );
gameStore.subscribe((value) => {
  localStorage.setItem("gameStore", JSON.stringify(value) );
});
