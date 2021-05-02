export {};

const inputs = (await Deno.readTextFile('./input')).split('\n');

console.log(
  Math.max(
    ...inputs.map((input) => {
      let minRow = 0;
      let maxRow = 127;
      let minColumn = 0;
      let maxColumn = 7;
      [...input].forEach((c) => {
        if (c === 'F') {
          maxRow = minRow + Math.floor((maxRow - minRow) / 2);
        } else if (c === 'B') {
          minRow = minRow + Math.ceil((maxRow - minRow) / 2);
        } else if (c === 'L') {
          maxColumn = minColumn + Math.floor((maxColumn - minColumn) / 2);
        } else if (c === 'R') {
          minColumn = minColumn + Math.ceil((maxColumn - minColumn) / 2);
        }
      });
      return minRow * 8 + minColumn;
    })
  )
);
