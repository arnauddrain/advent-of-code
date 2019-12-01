const FileReader = require('../filereader.js');

async function main() {
  const lines = await new FileReader().readFile();
  const result = lines.map(line => Math.floor(line / 3) - 2).reduce((a, b) => a + b)
  console.log(result);
}

main();
