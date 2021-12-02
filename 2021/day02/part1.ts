export {};

interface Position {
  depth: number;
  horizontal: number;
}

interface Command {
  action: string;
  value: number;
}

const computePosition = (input: string) => {
  const position: Position = { depth: 0, horizontal: 0 };
  input
    .split('\n')
    .filter((line) => line.length > 0)
    .map((input): Command => {
      const line = input.split(' ');
      return { action: line[0], value: Number(line[1]) };
    })
    .forEach((movement) => {
      if (movement.action === 'forward') {
        position.horizontal += movement.value;
      } else if (movement.action === 'down') {
        position.depth += movement.value;
      } else {
        position.depth -= movement.value;
      }
    });
  return position;
};

const position = computePosition(await Deno.readTextFile('./input'));
console.log(position.depth * position.horizontal);
