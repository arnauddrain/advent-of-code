export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .slice(0, -1)
  .map((input) => Number(input))
  .sort((input1, input2) => input1 - input2);

inputs.unshift(0);
inputs.push(inputs[inputs.length - 1] + 3);

let multi = 1;
let incr = 0;
let value = 1;
inputs.forEach((input, index) => {
  const diff = inputs[index + 1] - input;
  if (diff === 1) {
    multi += incr++;
  } else if (diff === 3) {
    value *= multi;
    multi = 1;
    incr = 0;
  }
});

console.log(value);
