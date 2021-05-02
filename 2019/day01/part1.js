const lines = require('../filereader.js').readFile();
const result = lines.map(line => Math.floor(line / 3) - 2).reduce((a, b) => a + b)
console.log(result);
