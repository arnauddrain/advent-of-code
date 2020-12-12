export {};

let seats = (await Deno.readTextFile('./input'))
  .split('\n')
  .slice(0, -1)
  .map((input) => input.split(''));

const height = seats.length;
const width = seats[0].length;
const adjacent = 1;

function countAdjacent(x: number, y: number): number {
  let occupied = 0;
  for (
    let yAdjacent = Math.max(0, y - adjacent);
    yAdjacent <= Math.min(y + adjacent, height - 1);
    yAdjacent++
  ) {
    for (
      let xAdjacent = Math.max(0, x - adjacent);
      xAdjacent <= Math.min(x + adjacent, width - 1);
      xAdjacent++
    ) {
      if (
        (xAdjacent !== x || yAdjacent !== y) &&
        seats[yAdjacent][xAdjacent] === '#'
      ) {
        occupied++;
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
        } else if (occupied >= 4) {
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
