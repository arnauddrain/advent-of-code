const orbits = require('../filereader.js').readFile('\n', false);

const planets = {};
orbits.forEach((orbit) => {
  const orbitPlanets = orbit.split(')');
  planets[orbitPlanets[1]] = orbitPlanets[0];
});

function findPath(seekedPlanet, planets) {
  if (planets[seekedPlanet]) {
    return [seekedPlanet].concat(findPath(planets[seekedPlanet], planets));
  }
  return [];
}

let count = 0;
for (let key in planets) {
  if (!planets.hasOwnProperty(key)) continue;
  count += findPath(key, planets).length;
}
console.log(count);
