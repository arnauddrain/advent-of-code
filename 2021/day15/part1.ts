export {};

type hashmap = { [index: number]: boolean };
type hashmapInt = { [index: number]: number };

const lines = (await Deno.readTextFile('./input')).trim().split('\n');
const width = lines[0].length;
const height = lines.length;
const map = lines.join('').split('').map(Number);
const minMap: hashmapInt = {};

for (let y = height - 1; y >= 0; y--) {
  for (let x = width - 1; x >= 0; x--) {
    const position = y * width + x;
    minMap[position] = map[position];
    const isBorderRight = position % width === width - 1;
    const isBorderTop = y === height - 1;
    if (
      !isBorderRight &&
      (isBorderTop || minMap[position + 1] < minMap[position + width])
    ) {
      minMap[position] += minMap[position + 1];
    }
    if (
      !isBorderTop &&
      (isBorderRight || minMap[position + width] <= minMap[position + 1])
    ) {
      minMap[position] += minMap[position + width];
    }
  }
}

console.log(minMap[1], minMap[width]);
