export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n\n')
  .map((input) => input.split('\n').map((input) => input.split('')));

console.log(
  inputs
    .map((input) =>
      input[0].filter((answer) =>
        input.every((answers) => !answers.length || answers.includes(answer))
      )
    )
    .reduce((acc, item) => acc + item.length, 0)
);
