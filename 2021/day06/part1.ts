export {};

let fishes = (await Deno.readTextFile('./input')).trim().split(',').map(Number);

for (let i = 0; i < 80; i++) {
  const newFishes: number[] = [];
  fishes = fishes
    .map((fish) => {
      if (fish === 0) {
        fish = 6;
        newFishes.push(8);
      } else {
        fish--;
      }
      return fish;
    })
    .concat(newFishes);
}

console.log(fishes.length);
