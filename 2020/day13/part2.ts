export {};

interface Rule {
  a: number;
  b: number;
}

const inputs = (await Deno.readTextFile('./input')).split('\n').slice(0, -1);

const buses = inputs[1]
  .split(',')
  .map((bus, index) => ({
    a: bus === 'x' ? -1 : Number(bus),
    b: index,
  }))
  .filter((bus) => bus.a !== -1);

function isItAMatch(timestamp: number, buses: Rule[]): boolean {
  for (let i = 0; i < buses.length; i++) {
    if ((timestamp + buses[i].b) % buses[i].a !== 0) {
      return false;
    }
  }
  return true;
}

function lcmWithDiff(
  nb1: number,
  nb2: number,
  diff: number,
  diff2: number
): number {
  if (diff === diff2) {
    return 0;
  }
  let lcm = 0;
  while (nb1 * lcm < diff || (nb1 * lcm - diff) % nb2 !== diff2) {
    lcm++;
  }
  return lcm;
}

let equations = buses;

console.log(
  equations.map((equation) => `equation: ${equation.a}x + ${equation.b}`)
);

while (equations.length > 2) {
  equations = equations
    .slice(1)
    .map((equation) => {
      const a = equation.a * equations[0].a;
      const b =
        lcmWithDiff(equation.a, equations[0].a, equation.b, equations[0].b) *
          equation.a -
        equation.b;
      //console.log(`equation: ${a}x + ${b}`);
      return { a: a, b: b };
    })
    .sort((equation1, equation2) => equation1.b - equation2.b);

  console.log(
    equations.map((equation) => `equation: ${equation.a}x + ${equation.b}`)
  );
}

const max = Math.max(...equations.map((e) => e.a));
const maxEquation = equations[0]; //equations.find((equation) => equation.a === max) as Rule;

console.log('max equation', maxEquation);

let consoleValue = 10000000;
let digits = 8;
let x = 0;
let timestamp = maxEquation.a * x + maxEquation.b;
while (!isItAMatch(timestamp, buses)) {
  timestamp = maxEquation.a * x + maxEquation.b;
  x++;
  if (timestamp > consoleValue) {
    consoleValue *= 10;
    digits++;
    console.log(`checkin ${timestamp} (${digits} digits)`);
  }
}

console.log('timestamp', timestamp);

/*
console.log(buses[0]);
console.log(buses[1]);
let min, max;
if (buses[0].index < buses[1].index) {
  min = buses[0];
  max = buses[1];
} else {
  min = buses[1];
  max = buses[0];
}
const diffTime = max.index - min.index;
const diffValue = Math.abs(max.value - min.value);
console.log('diff:', diffTime);
console.log('diff:', diffValue);
let firstValue = diffValue;
while (firstValue % min.value !== diffTime) {
  firstValue += diffValue;
}
const firstTimestamp =
  min.value * (firstValue / diffValue + (firstValue - diffTime) / min.value);
console.log('first timestamp', firstTimestamp);

let test = diffValue;
while (test % min.value !== 0) {
  test += diffValue;
}
const truc = test / diffValue + diffValue;

let timestamp = firstTimestamp;
let consoleValue = 10000000;
let digits = 8;
let incr = 1;
while (!isItAMatch(timestamp, buses, min)) {
  timestamp = incr * truc * min.value + firstTimestamp;
  incr++;
  if (timestamp > consoleValue) {
    consoleValue *= 10;
    digits++;
    console.log(`checkin ${timestamp} (${digits} digits)`);
  }
}

console.log(timestamp - min.index);*/
