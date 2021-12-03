export {};

interface GammaEpsilonBinary {
  gamma: number[];
  epsilon: number[];
}

interface GammaEpsilon {
  gamma: number;
  epsilon: number;
}

function generateEmptyArrayWithLength(row: number[]) {
  return Array.from({ length: row.length }, () => 0);
}

function parseFile(str: string) {
  return str
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split('').map((n) => Number(n)));
}

function accBits(input: number[][]) {
  return input.reduce(
    (acc, value) => value.map((bit, i) => (bit === 0 ? -1 : 1) + acc[i]),
    generateEmptyArrayWithLength(input[0])
  );
}

function generateBinaryGammaEpsilon(input: number[]): GammaEpsilonBinary {
  return {
    gamma: input.map((bit) => (bit < 0 ? 0 : 1)),
    epsilon: input.map((bit) => (bit > 0 ? 0 : 1)),
  };
}

function binaryToDecimal(input: number[]) {
  return input.reduce(
    (acc, value, index) => acc + value * Math.pow(2, input.length - index - 1),
    0
  );
}

function convertBinaryGammaEpsilonToDecimal(input: GammaEpsilonBinary) {
  return {
    gamma: binaryToDecimal(input.gamma),
    epsilon: binaryToDecimal(input.epsilon),
  };
}

function computePower(input: GammaEpsilon) {
  return input.gamma * input.epsilon;
}

console.log(
  computePower(
    convertBinaryGammaEpsilonToDecimal(
      generateBinaryGammaEpsilon(
        accBits(parseFile(await Deno.readTextFile('./input')))
      )
    )
  )
);
