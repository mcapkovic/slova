
  export function removeLetter(word) {
    if (word.length < 2) return "";
    return word.slice(0, word.length - 1);
  }

  export function addLetter(word, character) {
    if (word.length > 5) return word;
    return word + character;
  }