export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .map((input) => Number(input));

function findInvalidNumber(inputs: number[]): number {
  for (let i = 25; i < inputs.length; i++) {
    const value = inputs[i];
    let found = false;
    for (let index1 = i - 25; !found && index1 < i; index1++) {
      for (let index2 = index1 + 1; !found && index2 < i; index2++) {
        if (inputs[index1] + inputs[index2] === value) {
          found = true;
        }
      }
    }
    if (!found) {
      return value;
    }
  }
  return -1;
}

const invalidNumber = findInvalidNumber(inputs);

for (let i = 0; i < inputs.length; i++) {
  const numbers = [inputs[i], inputs[i + 1]];
  let value = inputs[i] + inputs[i + 1];
  while (value < invalidNumber) {
    numbers.push(inputs[i + numbers.length]);
    value += numbers[numbers.length - 1];
  }
  if (value === invalidNumber) {
    console.log(Math.min(...numbers) + Math.max(...numbers));
  }
}
