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

const movements = {
  0: { x: 0, y: -1 },
  1: { x: 1, y: 0 },
  2: { x: 0, y: 1 },
  3: { x: -1, y: 0 }
}
let output = 0;
let panels = {};
let direction = 0; // 0: up 1: right 2: down 3: left
const robot = {
  x: 0, y: 0
};
panels[robot.x + '_' + robot.y] = 1;
let minX = 0;
let minY = 0;
let maxX = 0;
let maxY = 0;
while (output !== -1) {
  let panel = panels[robot.x + '_' + robot.y];
  let input = 0;
  if (panel !== undefined) {
    input = panel;
  }
  output = run(memory, input);
  if (output !== -1) {
    panels[robot.x + '_' + robot.y] = output;
    output = run(memory);
    if (output === 0) {
      direction = 4 * (direction === 0) + direction - 1;
    } else if (output === 1) {
      direction = (direction + 1) % 4;
    }
    robot.x += movements[direction].x;
    robot.y += movements[direction].y;
    if (robot.x < minX) {
      minX = robot.x;
    }
    if (robot.x < minY) {
      minY = robot.y;
    }
    if (robot.x > maxX) {
      maxX = robot.x;
    }
    if (robot.y > maxY) {
      maxY = robot.y;
    }
  }
}

for (var y = minY; y <= maxY; y++) {
  let line = '';
  for (var x = minX; x <= maxX; x++) {
    if (panels[x + '_' + y] === 1) {
      line += '#';
    } else {
      line += '.';
    }
  }
  console.log(line);
}
