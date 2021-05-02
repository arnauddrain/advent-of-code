export {};

const inputs = (await Deno.readTextFile('./input'))
  .split('\n')
  .map((input) => Number(input));

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
    console.log(value);
  }
}
