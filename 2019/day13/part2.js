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
  let output = null;
  while (output === null && memory.numbers[memory.position] != 99) {
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

const numbers = require('../filereader.js').readFile(',');
numbers[0] = 2;
const memory = {
  position: 0,
  relative: 0,
  numbers: numbers
}

let numberOfBlock = 0;
let hashMap = {};
let hasWin = false;
let joystick = 0;
let ball = { x: 0, y: 0 };
let paddle = { x: 0, y: 0 };
let gameHasStart = false;
let waitForScore = false;
let score = 0;

while (!hasWin) {
  const x = run(memory, joystick, joystick);
  const y = run(memory, joystick, joystick);
  const tile = run(memory, joystick, joystick);
  if (x === null) {
    return;
  }
  if (x === -1 && y === 0) {
    score = tile;
    if (waitForScore) {
      hasWin = true;
    }
  } else {
    if (tile !== 2) {
      if (hashMap[x.toString() + '-' + y.toString()] !== undefined) {
        numberOfBlock--;
        hashMap[x.toString() + '-' + y.toString()] = undefined;
      }
    }
    if (tile === 2) {
      if (!gameHasStart) {
        gameHasStart = true;
      }
      if (hashMap[x.toString() + '-' + y.toString()] === undefined) {
        numberOfBlock++;
        hashMap[x.toString() + '-' + y.toString()] = true;
      }
    }
    if (tile === 3) {
      paddle = { x: x, y: y };
    }
    if (tile === 4) {
      ball = { x: x, y: y };
    }
  }

  if (ball.x > paddle.x) {
    joystick = 1;
  } else if (ball.x < paddle.x) {
    joystick = -1;
  } else {
    joystick = 0;
  }

  if (gameHasStart && numberOfBlock === 0) {
    waitForScore = true;
  }
}

console.log('Score is ', score);
