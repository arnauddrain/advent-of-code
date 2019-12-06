// I'm so sorry, I should have use chained lists...

const orbits = require('../filereader.js').readFile('\n', false);

let count = 0;
const planets = {};
orbits.forEach((orbit) => {
  const orbitPlanets = orbit.split(')');
  if (!planets[orbitPlanets[0]]) {
    planets[orbitPlanets[0]] = [];
  }
  if (!planets[orbitPlanets[1]]) {
    planets[orbitPlanets[1]] = [];
  }
  planets[orbitPlanets[0]].push(planets[orbitPlanets[1]]);
});

function findOrbits(seekedPlanet, planets) {
  for (let key in planets) {
    if (!planets.hasOwnProperty(key)) continue;
    const planet = planets[key];
    if (planet.indexOf(seekedPlanet) !== -1) {
      return 1 + findOrbits(planet, planets);
    }
  }
  return 0;
}

for (let key in planets) {
  if (!planets.hasOwnProperty(key)) continue;
  count += findOrbits(planets[key], planets);
}
console.log(count);
