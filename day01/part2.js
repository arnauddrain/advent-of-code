const FileReader = require('../filereader.js');

function computeFuel(weight) {
  const fuel = Math.floor(weight / 3) - 2;
  if (fuel <= 0) {
    return 0;
  }
  return fuel + computeFuel(fuel);
}

async function main() {
  const lines = await new FileReader().readFile();
  const result = lines.map(computeFuel).reduce((a, b) => a + b)
  console.log(result);
}

main();
