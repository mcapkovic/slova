import { DEFAULT_KEYBOARD_STATE, GAME_STATE, KEY_STATE } from "./constants";

export function removeLetter(word) {
  if (word.length < 2) return "";
  return word.slice(0, word.length - 1);
}

export function addLetter(word, character) {
  if (word.length >= 5) return word;
  return word + character;
}

export function getClassNames(...classes) {
  return classes
    .map((argument) => {
      return typeof argument === "object"
        ? Object.keys(argument)
            .map((key) => (argument[key] ? key : null))
            .filter((argument) => !!argument)
            .join(" ")
        : argument;
    })
    .filter((argument) => !!argument)
    .join(" ");
}

// REMOVE ACCENTS
export function removeAccents(str) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function getKeysState(boardState) {
  const newKeyState = DEFAULT_KEYBOARD_STATE;

  boardState.forEach((row, rowIndex) => {
    const word = row.noAccentWord || "";
    row.tilesState.forEach((tileState, letterIndex) => {
      const letter = word[letterIndex];
      newKeyState[tileState] = [...newKeyState[tileState], letter];
    });
  });

  return newKeyState;
}

export function getKeyState(keyValue, keyboardState) {
  if (keyboardState?.CORRECT.includes(keyValue)) return KEY_STATE.CORRECT;
  if (keyboardState?.PRESENT.includes(keyValue)) return KEY_STATE.PRESENT;
  if (keyboardState?.ABSENT.includes(keyValue)) return KEY_STATE.ABSENT;
  return "";
}

export function getGameState(isWinner, isLoser) {
  if (isWinner) return GAME_STATE.WIN;
  if (isLoser) return GAME_STATE.LOSE;
  return GAME_STATE.IN_PROGRESS;
}
