export {};

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .map((input) => Number(input))
    .map((input, index, self) =>
      index > 1 && index < self.length - 1
        ? input + self[index - 2] + self[index - 1]
        : -1
    )
    .filter(
      (value, index, self) =>
        value !== -1 && self[index - 1] !== -1 && value > self[index - 1]
    ).length
);
