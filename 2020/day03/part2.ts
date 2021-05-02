export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .filter((input) => input.length);

console.log(
  [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ].reduce(
    (resultsAcc, params) =>
      resultsAcc *
      inputs
        .filter((_, index) => index % params.down === 0)
        .reduce((acc, value, index) => {
          return value[(index * params.right) % value.length] === '#'
            ? acc + 1
            : acc;
        }, 0),
    1
  ),
  'trees encountered'
);
