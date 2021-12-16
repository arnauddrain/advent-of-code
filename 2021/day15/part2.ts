export {};

type hashmap = { [index: number]: boolean };
type hashmapInt = { [index: number]: number };

const lines = (await Deno.readTextFile('./input')).trim().split('\n');
const smallWidth = lines[0].length;
const smallHeight = lines.length;
const smallMap = lines.join('').split('').map(Number);
const minMap: hashmapInt = {};
const map: hashmapInt = {};
const width = smallWidth * 5;
const height = smallHeight * 5;

for (let y = 0; y < smallHeight; y++) {
  for (let x = 0; x < smallWidth; x++) {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        map[y * width + i * width * smallHeight + x + j * smallWidth] =
          ((smallMap[y * smallWidth + x] + i + j - 1) % 9) + 1;
      }
    }
  }
}

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

// ok so this is suuuuper lazy, basically it check if sometimes it could have been faster to go in the "opposite" way.
// instead of looping x1000 we should juste update recursively every near positions (but I'm sick and tired and one day behind schedule)
for (let i = 0; i < 1000; i++) {
  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const position = y * width + x;
      const potentialValues = [];
      if (x > 0) {
        potentialValues.push(map[position] + minMap[position - 1]);
      }
      if (y > 0) {
        potentialValues.push(map[position] + minMap[position - width]);
      }
      if (x < width - 1) {
        potentialValues.push(map[position] + minMap[position + 1]);
      }
      if (y < height - 1) {
        potentialValues.push(map[position] + minMap[position + width]);
      }
      if (Math.min(...potentialValues) < minMap[position]) {
        minMap[position] = Math.min(...potentialValues);
      }
    }
  }
}

function displayMinMap() {
  for (let y = 0; y < height; y++) {
    let str = '';
    for (let x = 0; x < width; x++) {
      str += (minMap[y * width + x] ?? '-1') + '\t';
    }
    console.log(str);
  }
  console.log('---');
}

//displayMinMap();

console.log(minMap[1], minMap[width]);
