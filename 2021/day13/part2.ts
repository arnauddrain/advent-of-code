export {};

interface Fold {
  direction: 'x' | 'y';
  value: number;
}

interface Position {
  x: number;
  y: number;
}

type hashMap = { [key: string]: boolean };

function hashMapToPositions(hashMap: hashMap): Position[] {
  return Object.keys(hashMap).map((position) => {
    const [x, y] = position.split(':').map(Number);
    return { x: x, y: y };
  });
}

function display(positions: Position[], hashMap: hashMap) {
  const maxX = Math.max(...positions.map((p) => p.x));
  const maxY = Math.max(...positions.map((p) => p.y));
  for (let y = 0; y <= maxY; y++) {
    let str = '';
    for (let x = 0; x <= maxX; x++) {
      str += hashMap[x + ':' + y] ? '█' : ' ';
    }
    console.log(str);
  }
}

const file = await Deno.readTextFile('./input');
const parts = file.trim().split('\n\n');

const positions: hashMap = parts[0].split('\n').reduce((acc, position) => {
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

const newPositions = folds.reduce((previousPositions, fold) => {
  return hashMapToPositions(previousPositions).reduce(
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
}, positions);

display(hashMapToPositions(newPositions), newPositions);
