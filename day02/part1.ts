const inputs = (await Deno.readTextFile("./input")).split("\n").filter(
  (input) => input.length,
).map(
  (input) => {
    const parts = input.split(" ");
    const range = parts[0].split("-");
    return {
      min: Number(range[0]),
      max: Number(range[1]),
      letter: parts[1].substr(0, 1),
      password: parts[2],
    };
  },
);

console.log(
  inputs.filter((input) => {
    const nb = input.password.split(input.letter).length - 1;
    return nb >= input.min && nb <= input.max;
  }).length,
  "valid passwords",
);
