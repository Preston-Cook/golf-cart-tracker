export function capitalizeWord(word: string): string {
  if (word.length === 0) {
    return word;
  }

  let res = '';

  for (let i = 0; i < word.length; i++) {
    if (word[i] === ' ') {
      throw Error('Cannot parse sentence');
    }

    if (i === 0) {
      res += word[0].toUpperCase();
      continue;
    }

    res += word[i].toLowerCase();
  }

  return res;
}
