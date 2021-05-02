export {};

interface Action {
  command: string;
  value: number;
  performed: boolean;
}

const actions = Array.from(
  (await Deno.readTextFile('./input')).matchAll(/(.*) ([+-]{0,1}\d*)\n/gi)
).map((input) => ({
  command: input[1],
  value: Number(input[2]),
  performed: false,
}));

function computeProgram(
  actions: Action[]
): { corrupted: boolean; value: number } {
  actions.forEach((action) => (action.performed = false));
  let currentActionIndex = 0;
  let value = 0;
  while (
    currentActionIndex < actions.length &&
    !actions[currentActionIndex].performed
  ) {
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
  return { corrupted: currentActionIndex < actions.length, value: value };
}

actions.forEach((action) => {
  let result;
  if (action.command === 'nop') {
    action.command = 'jmp';
    result = computeProgram(actions);
    action.command = 'nop';
  } else if (action.command === 'jmp') {
    action.command = 'nop';
    result = computeProgram(actions);
    action.command = 'jmp';
  }
  if (result && !result.corrupted) {
    console.log(result.value);
  }
});
