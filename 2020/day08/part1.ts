export {};

const actions = Array.from(
  (await Deno.readTextFile('./input')).matchAll(/(.*) ([+-]{0,1}\d*)\n/gi)
).map((input) => ({
  command: input[1],
  value: Number(input[2]),
  performed: false,
}));

let currentActionIndex = 0;
let value = 0;
while (!actions[currentActionIndex].performed) {
  const action = actions[currentActionIndex];
  action.performed = true;
  if (action.command === 'acc') {
    value += action.value;
    currentActionIndex++;
  } else if (action.command === 'jmp') {
    currentActionIndex += action.value;
  } else {
    currentActionIndex++;
  }
}

console.log(value);
