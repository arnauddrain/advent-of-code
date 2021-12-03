export {};

function parseFile(str: string) {
  return str
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split('').map((n) => Number(n)));
}

function binaryToDecimal(input: number[]) {
  return input.reduce(
    (acc, value, index) => acc + value * Math.pow(2, input.length - index - 1),
    0
  );
}

function filterLines(input: number[][], index: number, bit: number) {
  return input.filter((row) => row[index] === bit);
}

function findMostCommonBit(input: number[][], index: number) {
  return input.reduce((acc, value) => acc + (value[index] === 0 ? -1 : 1), 0) <
    0
    ? 0
    : 1;
}

function findLeastCommonBit(input: number[][], index: number) {
  return input.reduce((acc, value) => acc + (value[index] === 0 ? -1 : 1), 0) <
    0
    ? 1
    : 0;
}

function findLine(
  input: number[][],
  index: number,
  fn: (input: number[][], index: number) => number
): number[] {
  if (input.length > 1) {
    return findLine(filterLines(input, index, fn(input, index)), index + 1, fn);
  }
  return input[0];
}

function computeLifeSupport(input: number[][]) {
  return (
    binaryToDecimal(findLine(input, 0, findMostCommonBit)) *
    binaryToDecimal(findLine(input, 0, findLeastCommonBit))
  );
}

console.log(computeLifeSupport(parseFile(await Deno.readTextFile('./input'))));
