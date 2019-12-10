const map = require('../filereader.js').readFile('\n', false);

const height = map.length;
const width = map[0].length;

let asteroids = {};
for (var y = 0; y < map.length; y++) {
  const line = map[y];
  for (var x = 0; x < line.length; x++) {
    if (line[x] !== '.') {
      asteroids[x + '_' + y] = { x: x, y: y, nb: 0, blocked: false };
    }
  }
}

const asteroidArray = [];
for (var key in asteroids) {
  if (!asteroids.hasOwnProperty(key)) continue;
  asteroidArray.push(asteroids[key]);
}

function computeBlocked(monitoringAsteroid) {
  asteroidArray.forEach((a) => a.blocked = false);
  asteroidArray.filter(a => a !== monitoringAsteroid).forEach(asteroid => {
    let distX = asteroid.x - monitoringAsteroid.x;
    let distY = asteroid.y - monitoringAsteroid.y;
    let targetX = monitoringAsteroid.x + distX;
    let targetY = monitoringAsteroid.y + distY;
    var gcdCalcul = function (a, b) {
      return b ? gcdCalcul(b, a % b) : a;
    };
    const gcd = Math.abs(gcdCalcul(distX, distY));
    distX /= gcd;
    distY /= gcd;
    targetX += distX;
    targetY += distY;
    while (targetX < width && targetY < height && targetX >= 0 && targetY >= 0) {
      const targetAsteroid = asteroids[targetX + '_' + targetY];
      if (targetAsteroid) {
        targetAsteroid.blocked = true;
      }
      targetX += distX;
      targetY += distY;
    }
  });
  monitoringAsteroid.nb = asteroidArray.filter(a => !a.blocked).length - 1;
}

asteroidArray.forEach(monitoringAsteroid => {
  computeBlocked(monitoringAsteroid);
});

let maxAsteroid = { nb: 0 };
asteroidArray.forEach(a => {
  if (a.nb > maxAsteroid.nb) {
    maxAsteroid = a
  }
});

let index = 0;

// Could add a loop to compute the last asteroid to be blasted

computeBlocked(maxAsteroid);
const nextAsteroids = asteroidArray.filter(a => !a.blocked);
nextAsteroids.forEach(a => {
  a.angle = Math.atan2(a.y - maxAsteroid.y, a.x - maxAsteroid.x) * (180 / Math.PI) + 90;
  if (a.angle < 0.0001) {
    a.angle += 360;
  }
});
nextAsteroids.sort((asteroid1, asteroid2) => {
  return asteroid1.angle - asteroid2.angle;
})
nextAsteroids.forEach(asteroid => {
  if (index === 199) {
    console.log(asteroid.x * 100 + asteroid.y)
  }
  index++;
});
