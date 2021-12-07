export {};

let crabs = (await Deno.readTextFile('./input')).trim().split(',').map(Number);

let minFuel = -1;
let bestPosition: number | undefined = undefined;

for (
  let position = Math.min(...crabs);
  position < Math.max(...crabs);
  position++
) {
  const fuel = crabs.reduce((acc, crab) => acc + Math.abs(crab - position), 0);
  if (fuel < minFuel || bestPosition === undefined) {
    minFuel = fuel;
    bestPosition = position;
  }
}

console.log(
  'Best position is ' + bestPosition + ' and it will cost ' + minFuel
);
