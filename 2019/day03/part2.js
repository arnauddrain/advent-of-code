console.time('main');

function getNextPosition(currentPosition, cable) {
  const direction = cable.substring(0, 1);
  const value = parseInt(cable.substring(1));
  const nextPosition = { x: currentPosition.x, y: currentPosition.y, distance: currentPosition.distance + value };
  switch (direction) {
    case 'R':
      nextPosition.x += value;
      break;
    case 'L':
      nextPosition.x -= value;
      break;
    case 'U':
      nextPosition.y -= value;
      break;
    case 'D':
      nextPosition.y += value;
      break;
  }
  return nextPosition;
}

function isBetween(point, lineFrom, lineTo) {
  return (point > lineFrom && point < lineTo) || (point > lineTo && point < lineFrom);
}

function doesIntercept(lines, newLine) {
  const intersections = [];
  lines.forEach(currentLine => {
    if (newLine.from.x === newLine.to.x) {
      if (currentLine.from.x !== currentLine.to.x) {
        if (isBetween(newLine.from.x, currentLine.from.x, currentLine.to.x)) {
          if (isBetween(currentLine.from.y, newLine.from.y, newLine.to.y)) {
            intersections.push(currentLine.from.distance + newLine.from.distance + Math.abs(currentLine.from.x - newLine.from.x) + Math.abs(newLine.from.y - currentLine.from.y));
          }
        }
      }
    } else {
      if (currentLine.from.y !== currentLine.to.y) {
        if (isBetween(newLine.from.y, currentLine.from.y, currentLine.to.y)) {
          if (isBetween(currentLine.from.x, newLine.from.x, newLine.to.x)) {
            intersections.push(currentLine.from.distance + newLine.from.distance + Math.abs(currentLine.from.x - newLine.from.x) + Math.abs(newLine.from.y - currentLine.from.y));
          }
        }
      }
    }
  });
  return intersections;
}

const cables = require('../filereader.js').readFile('\n', false);

const lines = [];
let currentPosition = { x: 0, y: 0, distance: 0 };
cables[0].split(',').forEach(cable => {
  const nextPosition = getNextPosition(currentPosition, cable);
  lines.push({ from: currentPosition, to: nextPosition });
  currentPosition = nextPosition;
});

const intersections = [];
currentPosition = { x: 0, y: 0, distance: 0 };
cables[1].split(',').forEach(cable => {
  const nextPosition = getNextPosition(currentPosition, cable);
  const line = { from: currentPosition, to: nextPosition };
  const newIntersections = doesIntercept(lines, line);
  intersections.push(...newIntersections);
  currentPosition = nextPosition;
});

let minDistance = 0;
intersections.forEach((intersection) => {
  if (minDistance === 0 || intersection < minDistance) {
    minDistance = intersection;
  }
});

console.timeEnd('main');
console.log(minDistance);
