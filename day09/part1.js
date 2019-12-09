// So sorry for the address thing, will change it soon

function accessMemory(memory, position) {
  if (memory.numbers[position] === undefined) {
    memory.numbers[position] = 0;
  }
  return memory.numbers[position];
}

const PARAMETERS_NB = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  9: 1
};

function readParameters(memory, instruction, opcode) {
  const parameters = [];
  const count = PARAMETERS_NB[instruction];
  for (var i = 0; i < count; i++) {
    const mode = Math.floor(opcode / Math.pow(10, i + 2)) % 10;
    let value;
    switch (mode) {
      case 0:
        value = accessMemory(memory, memory.numbers[memory.position + i + 1]);
        break;
      case 1:
        value = memory.numbers[memory.position + i + 1];
        break;
      case 2:
        value = accessMemory(memory, memory.numbers[memory.position + i + 1] + memory.relative);
        break;
    }
    parameters.push(value);
  }
  return parameters;
}

function run(memory, input1, input2) {
  let nextInput = input1;
  while (memory.position < memory.numbers.length && memory.numbers[memory.position] != 99) {
    const opcode = memory.numbers[memory.position];
    const instruction = opcode % 10;
    const parameters = readParameters(memory, instruction, opcode);
    let nextPosition = memory.position + PARAMETERS_NB[instruction] + 1;
    let address;
    // console.log(instruction, parameters);
    switch (instruction) {
      case 1:
        address = memory.numbers[memory.position + 3] + (Math.floor(opcode / 10000) % 10 === 2) * memory.relative;
        const result1 = parameters[0] + parameters[1];
        memory.numbers[address] = result1;
        break;
      case 2:
        address = memory.numbers[memory.position + 3] + (Math.floor(opcode / 10000) % 10 === 2) * memory.relative;
        const result2 = parameters[0] * parameters[1];
        memory.numbers[address] = result2;
        break;
      case 3:
        address = memory.numbers[memory.position + 1] + (Math.floor(opcode / 100) % 10 === 2) * memory.relative;
        memory.numbers[address] = nextInput;
        nextInput = input2;
        break;
      case 4:
        const output = parameters[0];
        console.log('output', output);
        break;
      case 5:
        if (parameters[0]) {
          nextPosition = parameters[1];
        }
        break;
      case 6:
        if (!parameters[0]) {
          nextPosition = parameters[1];
        }
        break;
      case 7:
        address = memory.numbers[memory.position + 3] + (Math.floor(opcode / 10000) % 10 === 2) * memory.relative;
        memory.numbers[address] = (parameters[0] < parameters[1]) ? 1 : 0;
        break;
      case 8:
        address = memory.numbers[memory.position + 3] + (Math.floor(opcode / 10000) % 10 === 2) * memory.relative;
        memory.numbers[address] = (parameters[0] === parameters[1]) ? 1 : 0;
        break;
      case 9:
        memory.relative += parameters[0];
        break;
    }
    memory.position = nextPosition;
  }
  return -1;
}

const memory = {
  position: 0,
  relative: 0,
  numbers: require('../filereader.js').readFile(',')
}

console.log(run(memory, 1));
