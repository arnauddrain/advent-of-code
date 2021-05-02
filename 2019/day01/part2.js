function computeFuel(weight) {
  const fuel = Math.floor(weight / 3) - 2;
  return (fuel <= 0) ? 0 : fuel + computeFuel(fuel);
}

const lines = require('../filereader.js').readFile();
const result = lines.map(computeFuel).reduce((a, b) => a + b)
console.log(result);
