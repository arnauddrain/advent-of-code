const fs = require('fs');
const readline = require('readline');

module.exports = class FileReader {
  async readFile() {
    const fileStream = fs.createReadStream('input');
    const lines = [];

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      lines.push(parseInt(line));
    }

    return lines;
  }
}
