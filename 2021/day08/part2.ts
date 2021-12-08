export {};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

const combinations = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];

console.log(
  (await Deno.readTextFile('./input'))
    .split('\n')
    .filter((s) => s)
    .map((row) => {
      const parts = row.split('|');
      const samples = parts[0]
        .trim()
        .split(' ')
        .sort((a, b) => a.length - b.length);
      const values = parts[1].trim().split(' ');

      const lettersOccurrences = letters.map((letter) => ({
        key: letter,
        value: samples.filter((sample) => sample.includes(letter)).length,
      }));

      const a = samples[1]
        .split('')
        .find((letter) => !samples[0].includes(letter));

      const f = lettersOccurrences.find((occurrence) => occurrence.value === 9)
        ?.key as string;

      const b = lettersOccurrences.find((occurrence) => occurrence.value === 6)
        ?.key as string;

      const e = lettersOccurrences.find((occurrence) => occurrence.value === 4)
        ?.key as string;

      const c = samples[0].split('').find((letter) => letter !== f);

      const d = samples
        .filter((sample) => sample.length === 6)
        .map((sample) => letters.find((l) => !sample.includes(l)))
        .find((l) => ![c, e].includes(l));

      const g = letters.find((l) => ![a, b, c, d, e, f].includes(l));

      return Number(
        values
          .map((v) =>
            v
              .split('')
              .map(
                (l) => letters[[a, b, c, d, e, f, g].findIndex((v) => v === l)]
              )
              .sort()
              .join('')
          )
          .map((v) => combinations.findIndex((c) => c === v))
          .join('')
      );
    })
    .reduce((acc, value) => acc + value, 0)
);
