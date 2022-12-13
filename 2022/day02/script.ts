enum Symbols {
  ROCK = 1,
  PAPER,
  SCISSORS,
}

const letterValues: { [key: string]: number } = {
  A: Symbols.ROCK,
  B: Symbols.PAPER,
  C: Symbols.SCISSORS,
  X: Symbols.ROCK,
  Y: Symbols.PAPER,
  Z: Symbols.SCISSORS,
};

function parse(input: string) {
  return input.split('\n').map((round) => round.split(' '));
}

export default class Day02 {
  static part1(input: string) {
    return parse(input)
      .map((values) => [letterValues[values[0]], letterValues[values[1]]])
      .map((choices) =>
        (choices[1] === Symbols.SCISSORS && choices[0] === Symbols.PAPER) ||
        (choices[1] === Symbols.ROCK && choices[0] === Symbols.SCISSORS) ||
        (choices[1] === Symbols.PAPER && choices[0] === Symbols.ROCK)
          ? 6 + choices[1]
          : choices[1] === choices[0]
          ? 3 + choices[1]
          : choices[1]
      )
      .reduce((prev, acc) => prev + acc, 0);
  }

  static part2(input: string) {
    return parse(input)
      .map((values) => ({ left: letterValues[values[0]], right: values[1] }))
      .map((choices) =>
        choices.right === 'Y'
          ? choices.left + 3
          : choices.right === 'X'
          ? ((choices.left + 1) % 3) + 1
          : 6 + (choices.left % 3) + 1
      )
      .reduce((prev, acc) => prev + acc, 0);
  }
}
