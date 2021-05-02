function run(memory, input1, input2) {
  let nextInput = input1;
  while (memory.position < memory.numbers.length && memory.numbers[memory.position] != 99) {
    const opcode = memory.numbers[memory.position];
    const instruction = opcode % 10;
    const mode1 = Math.floor(opcode / 100) % 10;
    const mode2 = Math.floor(opcode / 1000) % 10;
    const parameter1 = mode1 ? memory.numbers[memory.position + 1] : memory.numbers[memory.numbers[memory.position + 1]];
    const parameter2 = mode2 ? memory.numbers[memory.position + 2] : memory.numbers[memory.numbers[memory.position + 2]];
    switch (instruction) {
      case 1:
        const result1 = parameter1 + parameter2;
        memory.numbers[memory.numbers[memory.position + 3]] = result1;
        memory.position += 4;
        break;
      case 2:
        const result2 = parameter1 * parameter2;
        memory.numbers[memory.numbers[memory.position + 3]] = result2;
        memory.position += 4;
        break;
      case 3:
        memory.numbers[memory.numbers[memory.position + 1]] = nextInput;
        nextInput = input2;
        memory.position += 2;
        break;
      case 4:
        const output = memory.numbers[memory.numbers[memory.position + 1]];
        memory.position += 2;
        return output;
      case 5:
        if (parameter1) {
          memory.position = parameter2;
        } else {
          memory.position += 3;
        }
        break;
      case 6:
        if (!parameter1) {
          memory.position = parameter2;
        } else {
          memory.position += 3;
        }
        break;
      case 7:
        memory.numbers[memory.numbers[memory.position + 3]] = (parameter1 < parameter2) ? 1 : 0;
        memory.position += 4;
        break;
      case 8:
        memory.numbers[memory.numbers[memory.position + 3]] = (parameter1 === parameter2) ? 1 : 0;
        memory.position += 4;
        break;
    }
  }
  return -1;
}

function computePhaseSettings(phaseSettings) {
  const numbers = require('../filereader.js').readFile(',');
  const memories = [];
  for (var i = 0; i < 5; i++) {
    memories.push({
      numbers: numbers.slice(),
      position: 0
    });
  }

  let output = 0;
  let thrustersInput = -1;
  let amplifierIndex = 0;
  while (output !== -1) {
    if (thrustersInput === -1) {
      output = run(memories[amplifierIndex], phaseSettings[amplifierIndex], output);
    } else {
      output = run(memories[amplifierIndex], output, output);
    }
    if (amplifierIndex === 4) {
      thrustersInput = output;
    }
    amplifierIndex = (amplifierIndex + 1) % 5;
  }

  return thrustersInput;
}

function find(maxResult, phaseSettings) {
  if (phaseSettings.length === 5) {
    const result = computePhaseSettings(phaseSettings);
    if (result > maxResult) {
      return result;
    }
    return maxResult;
  }
  for (var phaseSetting = 5; phaseSetting <= 9; phaseSetting++) {
    if (phaseSettings.indexOf(phaseSetting) === -1) {
      maxResult = find(maxResult, phaseSettings.concat(phaseSetting));
    }
  }
  return maxResult;
}

console.log(find(0, []));
