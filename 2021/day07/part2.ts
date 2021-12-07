export {};

let crabs = (await Deno.readTextFile('./input')).trim().split(',').map(Number);

let minFuel = -1;
let bestPosition: number | undefined = undefined;

for (
  let position = Math.min(...crabs);
  position < Math.max(...crabs);
  position++
) {
  const fuel = crabs.reduce((acc, crab) => {
    // Thank you https://www.quora.com/What-is-10-9-8-7-6-5-4-3-2-1
    const distance = Math.abs(crab - position);
    return acc + (distance * (distance + 1)) / 2;
  }, 0);
  if (fuel < minFuel || bestPosition === undefined) {
    minFuel = fuel;
    bestPosition = position;
  }
}

console.log(
  'Best position is ' + bestPosition + ' and it will cost ' + minFuel
);
