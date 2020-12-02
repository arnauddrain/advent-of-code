export {};

const inputs = (await Deno.readTextFile("./input")).split("\n").filter(
  (input) => input.length,
).map(
  (input) => {
    const parts = input.split(" ");
    const range = parts[0].split("-");
    return {
      first: Number(range[0]) - 1,
      second: Number(range[1]) - 1,
      letter: parts[1].substr(0, 1),
      password: parts[2],
    };
  },
);

console.log(
  inputs.filter((input) => {
    return (input.password.charAt(input.first) === input.letter) !==
      (input.password.charAt(input.second) === input.letter);
  }).length,
  "valid passwords",
);
