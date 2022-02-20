export const FILLED = "FILLED";
export const EMPTY = "EMPTY";
export const CORRECT = "CORRECT";
export const PRESENT = "PRESENT";
export const ABSENT = "ABSENT";

export const KEY_STATE = {
  CORRECT: "CORRECT",
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
};

export const TILE_STATE = {
  ...KEY_STATE,
  FILLED: "FILLED",
  EMPTY: "EMPTY",
};

export const GAME_STATE = {
  IN_PROGRESS: "IN_PROGRESS",
  WIN: "WIN",
  LOSE: "LOSE",
};

export const KEYS = {
  ENTER: "Enter",
  BACKSPACE: "Backspace",
};

export const DEFAULT_GAME_STATE = {
  boardState: [],
  word: undefined,
};

export const DEFAULT_KEYBOARD_STATE = {
  [KEY_STATE.CORRECT]: [],
  [KEY_STATE.PRESENT]: [],
  [KEY_STATE.ABSENT]: [],
};

export const WORD_LENGTH = 5;

export const TILLE_DELAY = [100, 170, 210, 250, 350];

export const END_GAME_DIALOG_DELAY = 1000;
