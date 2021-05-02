export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .filter((input) => input.length);

console.log(
  inputs.reduce((acc, value, index) => {
    return value[(index * 3) % value.length] === '#' ? acc + 1 : acc;
  }, 0),
  'trees encountered'
);
