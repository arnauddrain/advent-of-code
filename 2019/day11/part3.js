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
  numbers: '3,8,1005,8,319,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,28,2,1105,12,10,1006,0,12,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,58,2,107,7,10,1006,0,38,2,1008,3,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,90,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,112,1006,0,65,1,1103,1,10,1006,0,91,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,144,1006,0,32,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,169,1,109,12,10,1006,0,96,1006,0,5,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,201,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,223,1,4,9,10,2,8,5,10,1,3,4,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,257,1,1,9,10,1006,0,87,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,287,2,1105,20,10,1,1006,3,10,1,3,4,10,101,1,9,9,1007,9,1002,10,1005,10,15,99,109,641,104,0,104,1,21102,1,932972962600,1,21101,0,336,0,1106,0,440,21101,838483681940,0,1,21101,0,347,0,1106,0,440,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,3375393987,0,1,21101,394,0,0,1105,1,440,21102,46174071847,1,1,21102,1,405,0,1106,0,440,3,10,104,0,104,0,3,10,104,0,104,0,21101,988648461076,0,1,21101,428,0,0,1106,0,440,21101,0,709580452200,1,21101,439,0,0,1105,1,440,99,109,2,22101,0,-1,1,21101,40,0,2,21102,1,471,3,21102,461,1,0,1106,0,504,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,466,467,482,4,0,1001,466,1,466,108,4,466,10,1006,10,498,1102,0,1,466,109,-2,2105,1,0,0,109,4,1202,-1,1,503,1207,-3,0,10,1006,10,521,21102,1,0,-3,22102,1,-3,1,21201,-2,0,2,21101,0,1,3,21102,540,1,0,1106,0,545,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,568,2207,-4,-2,10,1006,10,568,22101,0,-4,-4,1105,1,636,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,1,587,0,1105,1,545,22101,0,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,606,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,628,21201,-1,0,1,21101,0,628,0,106,0,503,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0'.split(',').map(n => parseInt(n))
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
let steps = [];
while (output !== -1) {
  let panel = panels[robot.x + '_' + robot.y];
  let input = 0;
  if (panel !== undefined) {
    input = panel;
  }
  output = run(memory, input);
  if (output !== -1) {
    if (output === 1 && panels[robot.x + '_' + robot.y] !== 1) {
      steps.push({ x: robot.x, y: robot.y });
    }
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
  const line = document.createElement('tr');
  for (var x = minX; x <= maxX; x++) {
    line.appendChild(document.createElement('td'));
  }
  document.getElementById('map').appendChild(line);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function paint(steps, i) {
  const step = steps[i];
  const t = document.getElementById('map');
  const r = t.getElementsByTagName('tr')[step.y - minY];
  const c = r.getElementsByTagName('td')[step.x - minX];
  c.classList.add('white');
  if (i < steps.length - 1) {
    setTimeout(() => { paint(steps, i + 1) }, 50)
  }
}

paint(steps, 0);
