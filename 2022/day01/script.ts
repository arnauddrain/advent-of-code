export default class Day01 {
  static part1(input: string) {
    return input
      .split('\n\n')
      .map((elf) =>
        elf.split('\n').reduce((acc, current) => acc + parseInt(current), 0)
      )
      .sort((a, b) => b - a)[0];
  }

  static part2(input: string) {
    return input
      .split('\n\n')
      .map((elf) =>
        elf.split('\n').reduce((acc, current) => acc + parseInt(current), 0)
      )
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((acc, current) => acc + current, 0);
  }
}
