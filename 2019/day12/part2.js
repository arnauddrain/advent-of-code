const moonsStr = require('../filereader.js').readFile('\n', false);

const moons = [];
moonsStr.forEach(moonStr => {
  const numerics = moonStr.substr(3).split('=').map(e => parseInt(e));
  moons.push({
    x: numerics[0],
    y: numerics[1],
    z: numerics[2],
  });
});

function findLoop(values) {
  let states = {};
  let steps = 0;
  let found = false;
  let hash = '';
  values.forEach(value => {
    hash += value.value.toString() + value.velocity.toString();
  });
  states[hash] = steps++;
  while (!found) {
    values.forEach(computingValue => {
      values.forEach(otherValue => {
        computingValue.velocity += (computingValue.value < otherValue.value) - (computingValue.value > otherValue.value);
      });
    });
    hash = '';
    values.forEach(value => {
      value.value += value.velocity;
      hash += value.value.toString() + value.velocity.toString();
    });
    if (states[hash] !== undefined) {
      found = true;
    } else {
      states[hash] = steps++;
    }
  }
  return steps;
}

const x = findLoop(moons.map(m => ({ value: m.x, velocity: 0 })));
const y = findLoop(moons.map(m => ({ value: m.y, velocity: 0 })));
const z = findLoop(moons.map(m => ({ value: m.z, velocity: 0 })));

function gcd2(a, b) {
  // Greatest common divisor of 2 integers
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
}
function gcd(array) {
  // Greatest common divisor of a list of integers
  var n = 0;
  for (var i = 0; i < array.length; ++i)
    n = gcd2(array[i], n);
  return n;
}
function lcm2(a, b) {
  // Least common multiple of 2 integers
  return a * b / gcd2(a, b);
}
function lcm(array) {
  // Least common multiple of a list of integers
  var n = 1;
  for (var i = 0; i < array.length; ++i)
    n = lcm2(array[i], n);
  return n;
}

console.log(lcm([x, y, z]))
