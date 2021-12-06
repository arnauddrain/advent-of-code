export {};

interface Position {
  x: number;
  y: number;
}

interface Vent {
  from: Position;
  to: Position;
}

function generatePosition1D(
  vent: Vent,
  dimension: keyof Position,
  i: number
): number {
  return vent.from[dimension] === vent.to[dimension]
    ? vent.from[dimension]
    : Math.min(vent.from[dimension], vent.to[dimension]) + i;
}

function generatePosition(vent: Vent) {
  return Array.from(
    Array(Math.abs(vent.from.x - vent.to.x + vent.from.y - vent.to.y) + 1)
  ).map(
    (v, i) =>
      generatePosition1D(vent, 'x', i) + ':' + generatePosition1D(vent, 'y', i)
  );
}

console.log(
  Array.from(
    (await Deno.readTextFile('./input')).matchAll(
      /(\d*),(\d*) -> (\d*),(\d*)/gm
    )
  )
    .map(
      (row): Vent => ({
        from: { x: +row[1], y: +row[2] },
        to: { x: +row[3], y: +row[4] },
      })
    )
    .filter((vent) => vent.from.x === vent.to.x || vent.from.y === vent.to.y)
    .map(generatePosition)
    .flat()
    .filter((position, index, self) => self.indexOf(position) !== index) // this part is soooo slow, should convert to hash map but the algo is a bit different (and I'm late)
    .filter((position, index, self) => self.indexOf(position) === index).length
);
