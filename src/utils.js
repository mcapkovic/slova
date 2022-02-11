
  export function removeLetter(word) {
    if (word.length < 2) return "";
    return word.slice(0, word.length - 1);
  }

  export function addLetter(word, character) {
    if (word.length > 5) return word;
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