export {};

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .map((input) => Number(input))
    .filter((value, index, self) => index > 0 && value > self[index - 1]).length
);
