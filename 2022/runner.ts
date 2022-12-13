import fs from 'fs';

import Day01 from './day01/script';
import Day02 from './day02/script';
import Day03 from './day03/script';

const days = [Day01, Day02, Day03];

function displayUsageAndQuit() {
  console.log(
    'Usage: bun run runner.ts [day: number] [part: number] [input: string]'
  );
  process.exit(1);
}

if (process.argv.length < 5) {
  displayUsageAndQuit();
}

const day = Number(process.argv[2]);
const part = Number(process.argv[3]);
const inputFileName = process.argv[4];

const folder = `day${day < 10 ? '0' : ''}${day}`;

const input = fs.readFileSync(`${folder}/${inputFileName}`).toString().trim();

if (part === 1) {
  console.log(days[day - 1].part1(input));
} else if (part === 2) {
  console.log(days[day - 1].part2(input));
} else {
  displayUsageAndQuit();
}
