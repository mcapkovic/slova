import { writable } from "svelte/store";
import { DEFAULT_GAME_STATE } from "./constants.js";

const storedGameState = JSON.parse(localStorage.getItem("gameState"));
export const gameState = writable(storedGameState || DEFAULT_GAME_STATE );
gameState.subscribe((value) => {
  localStorage.setItem("gameState", JSON.stringify(value) );
});
