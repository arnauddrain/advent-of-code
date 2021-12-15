export {};

interface Rule {
  current: number;
  from: string;
  produce: string;
}

const file = await Deno.readTextFile('./input');
const parts = file.trim().split('\n\n');
let str = parts[0];
let rules = parts[1].split('\n').map<Rule>((line) => {
  const parts = line.split(' -> ');
  return { current: 0, from: parts[0], produce: parts[1] };
});

for (let index = 0; index < str.length - 1; index++) {
  const pair = str.slice(index, index + 2);
  const rule = rules.find((r) => r.from === pair);
  if (rule) {
    rule.current++;
  }
}

console.log(rules);

for (let i = 0; i < 40; i++) {
  const newRules = rules.map<Rule>((rule) => ({
    current: 0,
    from: rule.from,
    produce: rule.produce,
  }));
  rules.forEach((rule) => {
    const firstRule = newRules.find(
      (r) => r.from === rule.from[0] + rule.produce
    );
    const secondRule = newRules.find(
      (r) => r.from === rule.produce + rule.from[1]
    );
    if (firstRule) {
      firstRule.current += rule.current;
    }
    if (secondRule) {
      secondRule.current += rule.current;
    }
  });
  rules = newRules;
}

console.log(rules);

const occurrences: { [key: string]: number } = {};
occurrences[str[0]] = 1;
rules.forEach((rule) => {
  const char = rule.from[1];
  if (occurrences[char]) {
    occurrences[char] += rule.current;
  } else {
    occurrences[char] = rule.current;
  }
});

console.log(occurrences);

const min = Object.entries(occurrences).reduce<[string, number]>(
  (min, entry) => (min[0] === '' || entry[1] < min[1] ? entry : min),
  ['', 0]
);
const max = Object.entries(occurrences).reduce<[string, number]>(
  (max, entry) => (max[0] === '' || entry[1] > max[1] ? entry : max),
  ['', 0]
);

console.log(max[1] - min[1]);
