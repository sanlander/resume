export function firstLetterToUppercase(str) {
  const strNoSpace = str.trim().replace(/ {1,}/g, ' ');

  const words = strNoSpace.split(' ');

  for (let i = 0; i < words.length; i += 1) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();
  }

  return words.join(' ');
}
