export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n\n')
  .map((input) => input.split('\n').map((input) => input.split('')));

console.log(
  inputs
    .map((input) => [...new Set(input.flat())])
    .reduce((acc, item) => acc + item.length, 0)
);
