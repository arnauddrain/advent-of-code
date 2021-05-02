function compute(noun, verb) {
  const numbers = require('../filereader.js').readFile(',');

  numbers[1] = noun;
  numbers[2] = verb;

  let position = 0;
  while (position < numbers.length && numbers[position] != 99) {
    if (numbers[position] === 1) {
      numbers[numbers[position + 3]] = numbers[numbers[position + 1]] + numbers[numbers[position + 2]];
    } else if (numbers[position] === 2) {
      numbers[numbers[position + 3]] = numbers[numbers[position + 1]] * numbers[numbers[position + 2]];
    }
    position += 4;
  }

  return numbers[0];
}

for (var noun = 0; noun <= 99; noun++) {
  for (var verb = 0; verb <= 99; verb++) {
    const result = compute(noun, verb);
    if (result === 19690720) {
      console.log(noun, verb, result, 100 * noun + verb);
    }
  }
}
