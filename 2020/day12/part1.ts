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
const directions = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
];
let directionIndex = 0;

commands.forEach((command) => {
  switch (command.action) {
    case 'N':
      y += command.value;
      break;
    case 'S':
      y -= command.value;
      break;
    case 'E':
      x += command.value;
      break;
    case 'W':
      x -= command.value;
      break;
    case 'L':
      directionIndex = (directionIndex - command.value / 90) % 4;
      if (directionIndex < 0) {
        directionIndex += 4;
      }
      break;
    case 'R':
      directionIndex = (directionIndex + command.value / 90) % 4;
      break;
    case 'F':
      x += directions[directionIndex].x * command.value;
      y += directions[directionIndex].y * command.value;
      break;
  }
});

console.log(x, y, Math.abs(x) + Math.abs(y));
