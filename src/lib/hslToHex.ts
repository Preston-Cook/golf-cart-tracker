/**
 *  Converts HSL to hexadecimal
 *
 * @param {number} h
 * @param {number} s
 * @param {number}l
 * @returns {string}
 *
 * Source: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
 */
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}