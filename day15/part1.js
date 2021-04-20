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

function accessMemory(memory, position) {
  if (memory.numbers[position] === undefined) {
    memory.numbers[position] = 0;
  }
  return memory.numbers[position];
}

function readParameters(memory, instruction, opcode) {
  const parameters = [];
  const count = PARAMETERS_NB[instruction];
  for (var i = 0; i < count; i++) {
    const mode = Math.floor(opcode / Math.pow(10, i + 2)) % 10;
    let value;
    let address = memory.numbers[memory.position + i + 1];
    if (mode === 2) {
      address += memory.relative;
    }
    if (mode === 1) {
      value = memory.numbers[memory.position + i + 1];
    } else {
      value = accessMemory(memory, address);
    }
    parameters.push({
      address: address,
      value: value
    });
  }
  return parameters;
}

function run(memory, input1, input2) {
  let nextInput = input1;
  let output = -1;
  while (output === -1 && memory.numbers[memory.position] != 99) {
    const opcode = memory.numbers[memory.position];
    const instruction = opcode % 10;
    const parameters = readParameters(memory, instruction, opcode);
    let nextPosition = memory.position + PARAMETERS_NB[instruction] + 1;
    switch (instruction) {
      case 1:
        const result1 = parameters[0].value + parameters[1].value;
        memory.numbers[parameters[2].address] = result1;
        break;
      case 2:
        const result2 = parameters[0].value * parameters[1].value;
        memory.numbers[parameters[2].address] = result2;
        break;
      case 3:
        memory.numbers[parameters[0].address] = nextInput;
        nextInput = input2;
        break;
      case 4:
        output = parameters[0].value;
        break;
      case 5:
        if (parameters[0].value) {
          nextPosition = parameters[1].value;
        }
        break;
      case 6:
        if (!parameters[0].value) {
          nextPosition = parameters[1].value;
        }
        break;
      case 7:
        memory.numbers[parameters[2].address] = (parameters[0].value < parameters[1].value) ? 1 : 0;
        break;
      case 8:
        memory.numbers[parameters[2].address] = (parameters[0].value === parameters[1].value) ? 1 : 0;
        break;
      case 9:
        memory.relative += parameters[0].value;
        break;
    }
    memory.position = nextPosition;
  }
  return output;
}

const memory = {
  position: 0,
  relative: 0,
  numbers: require('../filereader.js').readFile(',')
}

function hash(position) {
  return position.x.toString() + '_' + position.y.toString();
}

function pathFindingDistance(memory, position, alreadyVisited) {
  alreadyVisited[hash(position)] = true;
  for (var direction of [
    { x: 0, y: -1, code: 1 },
    { x: 0, y: 1, code: 2 },
    { x: -1, y: 0, code: 3 },
    { x: 1, y: 0, code: 4 }
  ]) {
    let newPosition = { x: position.x + direction.x, y: position.y + direction.y };
    if (!alreadyVisited[hash(newPosition)]) {
      const output = run(memory, direction.code);
      if (output === 2) {
        return 1;
      }
      if (output === 1) {
        const test = pathFindingDistance(memory, newPosition, alreadyVisited);
        if (test !== -1) {
          return test + 1;
        }
        run(memory, direction.code - (direction.code % 2 === 0) + (direction.code % 2 === 1));
      }
    }
  }
  return -1;
}

console.log(pathFindingDistance(memory, { x: 0, y: 0 }, {}));
