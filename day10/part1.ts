export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .slice(0, -1)
  .map((input) => Number(input))
  .sort((input1, input2) => input1 - input2);

inputs.unshift(0);
inputs.push(inputs[inputs.length - 1] + 3);

let count1 = 0;
let count3 = 0;
inputs.forEach((input, index) => {
  const diff = inputs[index + 1] - input;
  if (diff === 1) {
    count1++;
  } else if (diff === 3) {
    count3++;
  }
});

console.log(count1, count3, count1 * count3);
