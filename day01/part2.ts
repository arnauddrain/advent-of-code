export {};

const inputs = (await Deno.readTextFile("./input")).split("\n").map((input) =>
  Number(input)
);

for (let index1 = 0; index1 < inputs.length; index1++) {
  for (let index2 = index1 + 1; index2 < inputs.length; index2++) {
    for (let index3 = index2 + 1; index3 < inputs.length; index3++) {
      if (inputs[index1] + inputs[index2] + inputs[index3] === 2020) {
        console.log(inputs[index1] * inputs[index2] * inputs[index3]);
      }
    }
  }
}
