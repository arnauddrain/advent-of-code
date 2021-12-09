export {};

interface Position {
  x: number;
  y: number;
  height: number;
}

const visited: Position[] = []; // ok this is not functional at all...

function parseInput(input: string) {
  return input
    .split('\n')
    .filter((s) => s)
    .map((s) => s.split('').map(Number));
}

function makePosition(x: number, y: number, map: number[][]) {
  return { x: x, y: y, height: map[y][x] };
}

function findBasinsStarts(map: number[][]): Position[] {
  return map
    .map((row, y, map) =>
      row
        .map((point, x) =>
          (x === 0 || map[y][x - 1] > point) &&
          (x === map[0].length - 1 || map[y][x + 1] > point) &&
          (y === 0 || map[y - 1][x] > point) &&
          (y === map.length - 1 || map[y + 1][x] > point)
            ? makePosition(x, y, map)
            : undefined
        )
        .filter((p): p is Position => p !== undefined)
    )
    .flat();
}

function alreadyVisited(position: Position) {
  return (
    visited.find((p) => p.x === position.x && p.y === position.y) !== undefined
  );
}

function check(position: Position, newPosition: Position, map: number[][]) {
  if (
    newPosition.height !== 9 &&
    newPosition.height > position.height &&
    !alreadyVisited(newPosition)
  ) {
    visited.push(newPosition);
    return findBasin(newPosition, map);
  }
  return [];
}

function findBasin(position: Position, map: number[][]) {
  const newPositions: Position[] = [position]; // not so functional but... is it though?
  if (position.x > 0) {
    newPositions.push(
      ...check(position, makePosition(position.x - 1, position.y, map), map)
    );
  }
  if (position.x < map[0].length - 1) {
    newPositions.push(
      ...check(position, makePosition(position.x + 1, position.y, map), map)
    );
  }
  if (position.y > 0) {
    newPositions.push(
      ...check(position, makePosition(position.x, position.y - 1, map), map)
    );
  }
  if (position.y < map.length - 1) {
    newPositions.push(
      ...check(position, makePosition(position.x, position.y + 1, map), map)
    );
  }
  return newPositions;
}

function findBasins(map: number[][]) {
  return findBasinsStarts(map)
    .map((position) => findBasin(position, map))
    .map((basin) => basin.length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc * val, 1);
}

console.log(findBasins(parseInput(await Deno.readTextFile('./input'))));
