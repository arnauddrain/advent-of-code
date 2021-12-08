export {};

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .filter((s) => s)
    .map((row) =>
      row
        .split('|')[1]
        .trim()
        .split(' ')
        .filter((s) => ![5, 6].includes(s.length))
    )
    .flat().length
);
