export {};

let maxPos = 0;
let maxPosY = 0;

function doesReachY(y: number, minY: number, maxY: number) {
  let currentY = 0;
  let velocity = y;
  let potentialMaxPos = 0;
  while (velocity > 0 || currentY > maxY) {
    currentY += velocity;
    if (velocity === 0) {
      potentialMaxPos = currentY;
    }
    velocity--;
  }
  if (currentY >= minY) {
    if (potentialMaxPos > maxPos) {
      maxPos = potentialMaxPos;
      maxPosY = y;
    }
    return true;
  }
  return false;
}

const file = await Deno.readTextFile('./input');
const parts = file.trim().split(', ');
const yParts = parts[1].split('..');
const minY = Number(yParts[0].substr(2));
const maxY = Number(yParts[1]);

let y = 1;

while (doesReachY(y, minY, maxY)) {
  y++;
}

for (let i = 0; i < 100; i++) {
  doesReachY(y, minY, maxY);
  y++;
}

console.log(maxPosY, maxPos);
