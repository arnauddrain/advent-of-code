export {};

const file = await Deno.readTextFile('./input');
const parts = file.trim().split('\n\n');
let str = parts[0];
const rules = parts[1]
  .split('\n')
  .reduce<{ [key: string]: string }>((acc, line) => {
    const parts = line.split(' -> ');
    return { ...acc, [parts[0]]: parts[1] };
  }, {});

for (let i = 0; i < 40; i++) {
  console.log(i);
  let tmpStr = str[0];
  for (let index = 0; index < str.length - 1; index++) {
    const pair = str.slice(index, index + 2);
    if (rules[pair]) {
      tmpStr += rules[pair];
    } else {
      console.log('oh');
    }
    tmpStr += str[index + 1];
  }
  str = tmpStr;
}

const occurrences: { [key: string]: number } = {};
for (let i = 0; i < str.length; i++) {
  const char = str[i];
  if (occurrences[char]) {
    occurrences[char]++;
  } else {
    occurrences[char] = 1;
  }
}

const min = Object.entries(occurrences).reduce<[string, number]>(
  (min, entry) => (min[0] === '' || entry[1] < min[1] ? entry : min),
  ['', 0]
);
const max = Object.entries(occurrences).reduce<[string, number]>(
  (max, entry) => (max[0] === '' || entry[1] > max[1] ? entry : max),
  ['', 0]
);

console.log(max[1] - min[1]);
