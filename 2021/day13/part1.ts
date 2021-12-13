export {};

interface Fold {
  direction: 'x' | 'y';
  value: number;
}

interface Position {
  x: number;
  y: number;
}

function hashMapToPositions(hashMap: { [key: string]: boolean }): Position[] {
  return Object.keys(hashMap).map((position) => {
    const [x, y] = position.split(':').map(Number);
    return { x: x, y: y };
  });
}

const file = await Deno.readTextFile('./input');
const parts = file.trim().split('\n\n');

const positions = parts[0].split('\n').reduce((acc, position) => {
  const coords = position.split(',').map(Number);
  return { ...acc, [coords[0] + ':' + coords[1]]: true };
}, {});

const folds: Fold[] = parts[1].split('\n').map((fold) => {
  const parts = fold.split('=');
  return {
    direction: parts[0] === 'fold along y' ? 'y' : 'x',
    value: Number(parts[1]),
  };
});

const fold = folds[0];

const newPositions = hashMapToPositions(positions).reduce(
  (acc, { x, y }) => ({
    ...acc,
    [(fold.direction === 'x' && x > fold.value
      ? fold.value - (x - fold.value)
      : x) +
    ':' +
    (fold.direction === 'y' && y > fold.value
      ? fold.value - (y - fold.value)
      : y)]: true,
  }),
  {}
);

console.log(hashMapToPositions(newPositions).length);
