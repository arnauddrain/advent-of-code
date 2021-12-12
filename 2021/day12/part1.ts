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

function getPaths(
  paths: { [key: string]: string[] },
  currentPath: string[]
): string[] {
  const currentPosition = currentPath[currentPath.length - 1];
  if (currentPosition === 'end') {
    return [currentPath.join(',')];
  }
  return (paths[currentPath[currentPath.length - 1]] || []).reduce<string[]>(
    (acc, position) => {
      if (
        (position >= 'A' && position <= 'Z') ||
        !currentPath.includes(position)
      ) {
        return [...acc, ...getPaths(paths, [...currentPath, position])];
      } else {
        return acc;
      }
    },
    []
  );
}

console.log(
  getPaths(parsePaths(await Deno.readTextFile('./input')), ['start']).length
);
