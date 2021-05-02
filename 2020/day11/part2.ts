export {};

let seats = (await Deno.readTextFile('./input'))
  .split('\n')
  .slice(0, -1)
  .map((input) => input.split(''));

const height = seats.length;
const width = seats[0].length;

function countAdjacent(x: number, y: number): number {
  let occupied = 0;
  for (let yDirection = -1; yDirection <= 1; yDirection++) {
    for (let xDirection = -1; xDirection <= 1; xDirection++) {
      if (xDirection !== 0 || yDirection !== 0) {
        let newX = x + xDirection;
        let newY = y + yDirection;
        while (
          newX >= 0 &&
          newX < width &&
          newY >= 0 &&
          newY < height &&
          seats[newY][newX] === '.'
        ) {
          newX += xDirection;
          newY += yDirection;
        }
        if (
          newX >= 0 &&
          newX < width &&
          newY >= 0 &&
          newY < height &&
          seats[newY][newX] === '#'
        ) {
          occupied++;
        }
      }
    }
  }
  return occupied;
}

function oneRound() {
  let newSeats: string[][] = [];
  for (let y = 0; y < height; y++) {
    newSeats.push([]);
    for (let x = 0; x < width; x++) {
      if (seats[y][x] !== '.') {
        let occupied = countAdjacent(x, y);
        if (occupied === 0) {
          newSeats[y][x] = '#';
        } else if (occupied >= 5) {
          newSeats[y][x] = 'L';
        } else {
          newSeats[y][x] = seats[y][x];
        }
      } else {
        newSeats[y][x] = '.';
      }
    }
  }
  return newSeats;
}

function toString(seats: string[][]): string {
  return seats.map((seatRow) => seatRow.join('')).join('\n');
}

let newSeats = oneRound();
while (toString(newSeats) !== toString(seats)) {
  seats = newSeats;
  newSeats = oneRound();
}

console.log(seats.flat().filter((c) => c === '#').length);
