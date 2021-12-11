export {};

const GRID_SIZE = 10;

interface Octopus {
  flashed: boolean;
  energy: number;
}

let octopuses = (await Deno.readTextFile('./input'))
  .split('\n')
  .filter((s) => s)
  .map((s) => s.split(''))
  .flat()
  .map(Number)
  .map((n): Octopus => ({ energy: n, flashed: false }));

function increaseOctopusEnergy(octopuses: Octopus[]): Octopus[] {
  return octopuses.map((octopus) => ({
    ...octopus,
    energy: octopus.energy + 1,
  }));
}

function toInt(condition: boolean): number {
  return condition ? 1 : 0;
}

function computeNextEnergy(
  octopus: Octopus,
  index: number,
  octopuses: Octopus[]
) {
  if (octopus.flashed || isAboutToFlash(octopus)) {
    return 0;
  }
  return (
    octopus.energy +
    (toInt(index >= GRID_SIZE && isAboutToFlash(octopuses[index - GRID_SIZE])) +
      toInt(
        index < GRID_SIZE * GRID_SIZE - GRID_SIZE &&
          isAboutToFlash(octopuses[index + GRID_SIZE])
      ) +
      toInt(index % GRID_SIZE > 0 && isAboutToFlash(octopuses[index - 1])) +
      toInt(
        index % GRID_SIZE < GRID_SIZE - 1 &&
          isAboutToFlash(octopuses[index + 1])
      ) +
      toInt(
        index >= GRID_SIZE &&
          index % GRID_SIZE > 0 &&
          isAboutToFlash(octopuses[index - GRID_SIZE - 1])
      ) +
      toInt(
        index >= GRID_SIZE &&
          index % GRID_SIZE < GRID_SIZE - 1 &&
          isAboutToFlash(octopuses[index - GRID_SIZE + 1])
      ) +
      toInt(
        index < GRID_SIZE * GRID_SIZE - GRID_SIZE &&
          index % GRID_SIZE > 0 &&
          isAboutToFlash(octopuses[index + GRID_SIZE - 1])
      ) +
      toInt(
        index < GRID_SIZE * GRID_SIZE - GRID_SIZE &&
          index % GRID_SIZE < GRID_SIZE - 1 &&
          isAboutToFlash(octopuses[index + GRID_SIZE + 1])
      ))
  );
}

function isAboutToFlash(octopus: Octopus) {
  return octopus.energy > 9 && !octopus.flashed;
}

function flashAndIncreaseOctopusEnergy(octopuses: Octopus[]): Octopus[] {
  if (octopuses.filter((octopus) => isAboutToFlash(octopus)).length === 0) {
    return [...octopuses];
  } else {
    return flashAndIncreaseOctopusEnergy(
      octopuses.map((octopus, index) => ({
        ...octopus,
        energy: computeNextEnergy(octopus, index, octopuses),
        flashed: octopus.flashed || isAboutToFlash(octopus),
      }))
    );
  }
}

function reset(octopuses: Octopus[]): Octopus[] {
  return octopuses.map((octopus) => {
    return { ...octopus, flashed: false };
  });
}

function display(octopuses: Octopus[]) {
  for (let i = 0; i < GRID_SIZE; i++) {
    console.log(
      octopuses
        .slice(10 * i, 10 * (i + 1))
        .map((octopus) => octopus.energy)
        .join('')
    );
  }
  console.log('---');
}

function didAllFlash(octopuses: Octopus[]) {
  return (
    octopuses.filter((octopus) => octopus.energy === 0).length ===
    octopuses.length
  );
}

let turn = 0;
while (!didAllFlash(octopuses)) {
  turn++;
  //display(octopuses);
  octopuses = reset(
    flashAndIncreaseOctopusEnergy(increaseOctopusEnergy(octopuses))
  );
}

console.log('number or round:', turn);
