export {};

const openings = ['(', '[', '{', '<'];
const endings = [')', ']', '}', '>'];
const points = [1, 2, 3, 4];

function findIncompleteEnding(line: string[], lineEndings: string[]): string[] {
  if (!line.length) {
    return lineEndings;
  }
  if (openings.includes(line[0])) {
    return findIncompleteEnding(line.slice(1), [
      endings[openings.indexOf(line[0])],
      ...lineEndings,
    ]);
  } else if (lineEndings[0] === line[0]) {
    return findIncompleteEnding(line.slice(1), lineEndings.slice(1));
  } else {
    return [];
  }
}

function middle<T>(array: T[]): T {
  return array[Math.floor(array.length / 2)];
}

console.log(
  middle(
    (await Deno.readTextFile('./input'))
      .split('\n')
      .map((s) =>
        findIncompleteEnding(s.split(''), [])
          .map((e) => points[endings.indexOf(e)])
          .reduce((acc, value) => acc * 5 + value, 0)
      )
      .filter((s) => s !== 0)
      .sort((a, b) => a - b)
  )
);
