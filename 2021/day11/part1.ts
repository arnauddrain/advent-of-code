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
let totalFlashes = 0;

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

function incrementTotalAndReset(octopuses: Octopus[]): Octopus[] {
  return octopuses.map((octopus) => {
    if (octopus.flashed) {
      totalFlashes++;
      return { ...octopus, flashed: false };
    }
    return { ...octopus };
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

for (let i = 0; i < 100; i++) {
  //display(octopuses);
  octopuses = incrementTotalAndReset(
    flashAndIncreaseOctopusEnergy(increaseOctopusEnergy(octopuses))
  );
}

console.log('totalFlashes:', totalFlashes);
