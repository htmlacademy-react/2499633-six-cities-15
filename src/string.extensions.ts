// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  toCapitalized(): string;
}

String.prototype.toCapitalized = function () {
  const words = this.split(' ');
  const wordsToKeepLowercase = [
    /about/i,
    /above/i,
    /across/i,
    /after/i,
    /against/i,
    /among/i,
    /around/i,
    /before/i,
    /behind/i,
    /below/i,
    /beside/i,
    /between/i,
    /down/i,
    /during/i,
    /from/i,
    /inside/i,
    /into/i,
    /near/i,
    /over/i,
    /through/i,
    /towards/i,
    /under/i,
    /with/i,
  ];
  const wordsCased = words.map((word, index) => {
    if (index !== 0 && (word.length < 4 || wordsToKeepLowercase.some((item) => item.test(word)))) {
      return word.toLowerCase();
    }
    const firstLetter = word.charAt(0).toUpperCase();
    const restLetters = word.slice(1).toLowerCase();
    return `${firstLetter}${restLetters}`;
  });
  return wordsCased.join(' ');
};
