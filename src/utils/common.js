import {
  DEFAULT_KEYBOARD_STATE,
  GAME_STATE,
  KEY_STATE,
  KEYS,
  WORD_LENGTH,
  TILE_SYMBOL,
  TILE_STATE,
} from "./constants";

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

export function isEnterKey(key) {
  return key === KEYS.ENTER;
}

export function isBackspaceKey(key) {
  return key === KEYS.BACKSPACE;
}

export function isLetter(key) {
  return /^\p{L}$/u.test(key);
}

export function isRowSubmit(key, letterCount) {
  return key === KEYS.ENTER && letterCount === WORD_LENGTH;
}

/** * Implementation of XorShift * algorithm in JavaScript * with 2's complement
 * https://svijaykoushik.github.io/blog/2019/10/04/three-awesome-ways-to-generate-random-number-in-javascript/
 */
export function xorShift(originalSeed) {
  let seed = originalSeed;

  seed ^= seed << 13;
  seed ^= seed >> 17;
  seed ^= seed << 5;

  return seed < 0 ? ~seed + 1 : seed; //2's complement of the negative result to make all numbers positive.
}

export function generateBoardPreview(boardState) {
  let board = "";
  boardState.forEach(({ tilesState }) => {
    tilesState.forEach((state) => {
      board += TILE_SYMBOL[state];
    });
    board += "\n";
  });
  return board;
}

export function getDefaultTilesState(tileState = TILE_STATE.FILLED) {
  return Array.from({ length: WORD_LENGTH }, () => tileState);
}

export function validateWord(noAccentSolution, noAccentWord) {
  const tilesState = getDefaultTilesState(TILE_STATE.ABSENT);

  // count solution letters
  const availableLetters = {};
  for (const letter of noAccentSolution) {
    if (letter in availableLetters) {
      availableLetters[letter] += 1;
    } else {
      availableLetters[letter] = 1;
    }
  }

  // find "correct" letters
  for (let index = 0; index < noAccentSolution.length; index++) {
    const solutionLetter = noAccentSolution[index];
    const quessLetter = noAccentWord[index];
    if (solutionLetter === quessLetter) {
      tilesState[index] = TILE_STATE.CORRECT;
      availableLetters[solutionLetter] -= 1;
    }
  }

  // find "present" letters
  for (let index = 0; index < noAccentSolution.length; index++) {
    const solutionLetter = noAccentSolution[index];
    const quessLetter = noAccentWord[index];
    if (solutionLetter === quessLetter) continue;
    if (!(quessLetter in availableLetters)) continue;
    if (availableLetters[quessLetter] < 1) continue;
    tilesState[index] = TILE_STATE.PRESENT;
    availableLetters[quessLetter] -= 1;
  }

  return tilesState;
}
