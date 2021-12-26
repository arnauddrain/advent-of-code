export {};

function doesReachY(y: number, minY: number, maxY: number) {
  let currentY = 0;
  let velocity = y;
  while (
    (currentY + velocity < minY || currentY + velocity > maxY) &&
    currentY > minY
  ) {
    currentY += velocity;
    velocity--;
  }

  return currentY + velocity >= minY && currentY + velocity <= maxY;
}

function doesReach(
  x: number,
  y: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) {
  let currentY = 0;
  let currentX = 0;
  let velocityX = x;
  let velocityY = y;
  while (
    (currentY + velocityY < minY ||
      currentY + velocityY > maxY ||
      currentX + velocityX < minX ||
      currentX + velocityX > maxX) &&
    currentY > minY
  ) {
    currentY += velocityY;
    currentX += velocityX;
    velocityY--;
    if (velocityX > 0) {
      velocityX--;
    }
    if (velocityX < 0) {
      velocityX++;
    }
  }

  return (
    currentY + velocityY >= minY &&
    currentY + velocityY <= maxY &&
    currentX + velocityX >= minX &&
    currentX + velocityX <= maxX
  );
}

const file = await Deno.readTextFile('./input');
const parts = file.trim().split(', ');
const xParts = parts[0].substr(13).split('..');
const yParts = parts[1].split('..');
const minX = Number(xParts[0].substr(2));
const maxX = Number(xParts[1]);
const minY = Number(yParts[0].substr(2));
const maxY = Number(yParts[1]);

let total = 0;

// this is the ugliest thing I made until now in this calendar \o/
for (let y = -200; y < 200; y++) {
  if (doesReachY(y, minY, maxY)) {
    for (let x = -200; x < 200; x++) {
      if (doesReach(x, y, minX, maxX, minY, maxY)) total++;
    }
  }
}

console.log(total);
