export {};

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .filter((s) => s)
    .map((s) => s.split('').map(Number))
    .map((row, y, map) =>
      row.filter(
        (point, x) =>
          (x === 0 || map[y][x - 1] > point) &&
          (x === map[0].length - 1 || map[y][x + 1] > point) &&
          (y === 0 || map[y - 1][x] > point) &&
          (y === map.length - 1 || map[y + 1][x] > point)
      )
    )
    .flat()
    .reduce((acc, point) => acc + point + 1, 0)
);
