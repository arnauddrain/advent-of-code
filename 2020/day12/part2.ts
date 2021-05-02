export {};

const commands = (await Deno.readTextFile('./input'))
  .split('\n')
  .slice(0, -1)
  .map((input) => ({
    action: input.slice(0, 1),
    value: Number(input.slice(1)),
  }));

let x = 0;
let y = 0;
let directionX = 10;
let directionY = 1;
const directions = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
];
let swap = 0;

commands.forEach((command) => {
  switch (command.action) {
    case 'N':
      directionY += command.value;
      break;
    case 'S':
      directionY -= command.value;
      break;
    case 'E':
      directionX += command.value;
      break;
    case 'W':
      directionX -= command.value;
      break;
    case 'L':
      for (let i = 0; i < command.value / 90; i++) {
        swap = directionX;
        directionX = -directionY;
        directionY = swap;
      }
      break;
    case 'R':
      for (let i = 0; i < command.value / 90; i++) {
        swap = directionX;
        directionX = directionY;
        directionY = -swap;
      }
      break;
    case 'F':
      x += directionX * command.value;
      y += directionY * command.value;
      break;
  }
});

console.log(x, y, Math.abs(x) + Math.abs(y));
