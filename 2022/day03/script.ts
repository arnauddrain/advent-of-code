function getPriority(c: string) {
  if (c >= 'a') {
    return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  } else {
    return c.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
}

export default class Day03 {
  static part1(input: string) {
    return input
      .split('\n')
      .map((line) => {
        const left = line.substring(0, line.length / 2);
        const right = line.substring(line.length / 2);
        left.split('').find((c) => right.includes(c));
        const duplicate = left.split('').find((c) => right.includes(c)) || 'a';
        return getPriority(duplicate);
      })
      .reduce((prev, acc) => prev + acc, 0);
  }

  static part2(input: string) {
    const badges = [];
    const lines = input.split('\n');
    for (let i = 0; i < lines.length; i += 3) {
      badges.push(
        lines[i]
          .split('')
          .filter((c) => lines[i + 1].includes(c))
          .find((c) => lines[i + 2].includes(c)) ?? 'a'
      );
    }
    return badges
      .map((b) => getPriority(b))
      .reduce((prev, acc) => prev + acc, 0);
  }
}
