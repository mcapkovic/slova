import { DEFAULT_KEYBOARD_STATE } from "./constants";

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

export function getKeysState(gameState) {
  const { words, validations } = gameState;
  const newKeyState = DEFAULT_KEYBOARD_STATE;

  validations.forEach((wordValidation, rowIndex) => {
    wordValidation.forEach((leterValidation, letterIndex) => {
      const letter = words[rowIndex][letterIndex];
      newKeyState[leterValidation] = [...newKeyState[leterValidation], letter];
    });
  });

  return newKeyState;
}

export function getKeyState(keyValue, keyboardState) {
  if (keyboardState?.CORRECT.includes(keyValue)) return "CORRECT";
  if (keyboardState?.PRESENT.includes(keyValue)) return "PRESENT";
  if (keyboardState?.ABSENT.includes(keyValue)) return "ABSENT";
  return "";
}
