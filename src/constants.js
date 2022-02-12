export const FILLED = "FILLED";
export const EMPTY = "EMPTY";
export const CORRECT = "CORRECT";
export const PRESENT = "PRESENT";
export const ABSENT = "ABSENT";

export const BASIC_STATE = {
  CORRECT: "CORRECT",
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
};

export const TILE_STATE = {
  ...BASIC_STATE,
  FILLED: "FILLED",
  EMPTY: "EMPTY",
};

export const KEYS = {
  ENTER: "Enter",
  BACKSPACE: "Backspace",
};

export const DEFAULT_GAME_STATE = {
  words: [],
  validations: [],
};

export const DEFAULT_KEYBOARD_STATE = {
  [BASIC_STATE.CORRECT]: [],
  [BASIC_STATE.PRESENT]: [],
  [BASIC_STATE.ABSENT]: [],
};
