function run(input1, input2) {
  const numbers = require('../filereader.js').readFile(',');

  let nextInput = input1;
  let position = 0;
  let output;
  while (position < numbers.length && numbers[position] != 99) {
    const opcode = numbers[position];
    const instruction = opcode % 10;
    const mode1 = Math.floor(opcode / 100) % 10;
    const mode2 = Math.floor(opcode / 1000) % 10;
    const parameter1 = mode1 ? numbers[position + 1] : numbers[numbers[position + 1]];
    const parameter2 = mode2 ? numbers[position + 2] : numbers[numbers[position + 2]];
    switch (instruction) {
      case 1:
        const result1 = parameter1 + parameter2;
        numbers[numbers[position + 3]] = result1;
        position += 4;
        break;
      case 2:
        const result2 = parameter1 * parameter2;
        numbers[numbers[position + 3]] = result2;
        position += 4;
        break;
      case 3:
        numbers[numbers[position + 1]] = nextInput;
        nextInput = input2;
        position += 2;
        break;
      case 4:
        output = numbers[numbers[position + 1]];
        position += 2;
        break;
      case 5:
        if (parameter1) {
          position = parameter2;
        } else {
          position += 3;
        }
        break;
      case 6:
        if (!parameter1) {
          position = parameter2;
        } else {
          position += 3;
        }
        break;
      case 7:
        numbers[numbers[position + 3]] = (parameter1 < parameter2) ? 1 : 0;
        position += 4;
        break;
      case 8:
        numbers[numbers[position + 3]] = (parameter1 === parameter2) ? 1 : 0;
        position += 4;
        break;
    }
  }
  return output;
}

function find(maxResult, input, phaseSettings) {
  if (phaseSettings.length === 5) {
    if (input > maxResult) {
      return input;
    }
    return maxResult;
  }
  for (var phaseSetting = 5; phaseSetting <= 9; phaseSetting++) {
    if (phaseSettings.indexOf(phaseSetting) === -1) {
      const output = run(phaseSetting, input);
      maxResult = find(maxResult, output, phaseSettings.concat(phaseSetting));
    }
  }
  return maxResult;
}

console.log(find(0, 0, []));
