export {};

let fishes = (await Deno.readTextFile('./input')).trim().split(',').map(Number);

let fishesByDay: { [key: number]: number } = {};

for (let i = 0; i < 9; i++) {
  fishesByDay[i] = fishes.filter((f) => f === i).length;
}

for (let i = 0; i < 256; i++) {
  let newFishesByDay: { [key: number]: number } = {};
  for (let i = 8; i >= 0; i--) {
    if (i > 0) {
      newFishesByDay[i - 1] = fishesByDay[i];
    } else {
      newFishesByDay[6] += fishesByDay[i];
      newFishesByDay[8] = fishesByDay[i];
    }
  }
  fishesByDay = newFishesByDay;
}

let total = 0;
for (let i = 0; i < 9; i++) {
  total += fishesByDay[i];
}
console.log(total);
