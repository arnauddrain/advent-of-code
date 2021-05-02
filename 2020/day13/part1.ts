export {};

const inputs = (await Deno.readTextFile('./input')).split('\n').slice(0, -1);

const timestamp = Number(inputs[0]);
const buses = inputs[1]
  .split(',')
  .filter((i) => i !== 'x')
  .map((i) => Number(i));

let min = -1;
let busID = 0;

buses.forEach((bus) => {
  let busTimestamp = 0;
  while (busTimestamp < timestamp) {
    busTimestamp += bus;
  }
  if (min === -1 || busTimestamp - timestamp < min) {
    min = busTimestamp - timestamp;
    busID = bus;
  }
});

console.log(min, busID, min * busID);
