export {};

function parsePaths(str: string): { [key: string]: string[] } {
  return str
    .split('\n')
    .filter((s) => s)
    .reduce<{ [key: string]: string[] }>((acc, line) => {
      const [from, to] = line.split('-');
      return {
        ...acc,
        [from]: [...(acc[from] || []), to],
        [to]: [...(acc[to] || []), from],
      };
    }, {});
}

function hasSmallCavesDuplicates(paths: string[]): boolean {
  return paths.some((p, i) => (p < 'A' || p > 'Z') && paths.indexOf(p) !== i);
}

function getPaths(
  paths: { [key: string]: string[] },
  currentPath: string[],
  currentPosition: string
): number {
  if (currentPosition === 'end') {
    return 1;
  }
  const duplicates = hasSmallCavesDuplicates(currentPath); // such opti
  return (paths[currentPath[currentPath.length - 1]] || []).reduce(
    (acc, position) => {
      if (
        position !== 'start' &&
        ((position >= 'A' && position <= 'Z') ||
          !currentPath.includes(position) ||
          !duplicates)
      ) {
        return acc + getPaths(paths, [...currentPath, position], position);
      } else {
        return acc;
      }
    },
    0
  );
}

console.log(
  getPaths(parsePaths(await Deno.readTextFile('./input')), ['start'], 'start')
);
