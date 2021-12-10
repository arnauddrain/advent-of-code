export {};

const openings = ['(', '[', '{', '<'];
const endings = [')', ']', '}', '>'];
const points = [3, 57, 1197, 25137];

function findFirstIllegalCharacter(
  line: string[],
  lineEndings: string[]
): string | null {
  if (!line.length) {
    return null;
  }
  if (openings.includes(line[0])) {
    return findFirstIllegalCharacter(line.slice(1), [
      endings[openings.indexOf(line[0])],
      ...lineEndings,
    ]);
  } else if (lineEndings[0] === line[0]) {
    return findFirstIllegalCharacter(line.slice(1), lineEndings.slice(1));
  } else {
    return line[0];
  }
}

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .map((s) => findFirstIllegalCharacter(s.split(''), []))
    .filter((e): e is string => e !== null)
    .map((e) => points[endings.indexOf(e)])
    .reduce((acc, value) => acc + value, 0)
);
