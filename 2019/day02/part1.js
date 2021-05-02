const numbers = require('../filereader.js').readFile(',');

numbers[1] = 12;
numbers[2] = 2;

let position = 0;
while (position < numbers.length && numbers[position] != 99) {
  if (numbers[position] === 1) {
    numbers[numbers[position + 3]] = numbers[numbers[position + 1]] + numbers[numbers[position + 2]];
  } else if (numbers[position] === 2) {
    numbers[numbers[position + 3]] = numbers[numbers[position + 1]] * numbers[numbers[position + 2]];
  }
  position += 4;
}

console.log(numbers[0]);
