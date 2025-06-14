export function splitArrayPattern(arr) {
  const result = [];
  let i = 0;
  let toggle = true;

  while (i < arr.length) {
    const chunkSize = toggle ? 3 : 2;
    result.push(arr.slice(i, i + chunkSize));
    i += chunkSize;
    toggle = !toggle; // Alternate between 3 and 2
  }

  return result;
}