const numbers = require('../filereader.js').readFile(',');

const INPUT = 1;

let position = 0;
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
      numbers[numbers[position + 1]] = INPUT;
      position += 2;
      break;
    case 4:
      console.log(numbers[numbers[position + 1]]);
      position += 2;
      break;
  }
}
