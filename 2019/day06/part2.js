const orbits = require('../filereader.js').readFile('\n', false);

const planets = {};
orbits.forEach((orbit) => {
  const orbitPlanets = orbit.split(')');
  planets[orbitPlanets[1]] = orbitPlanets[0];
});

function findPath(seekedPlanet, planets) {
  if (planets[seekedPlanet]) {
    return findPath(planets[seekedPlanet], planets).concat([seekedPlanet]);
  }
  return [];
}

let youList = findPath('YOU', planets);
let santaList = findPath('SAN', planets);

for (var i = 0; i < youList.length; i++) {
  if (santaList[i] !== youList[i]) {
    console.log(santaList.length - i + (youList.length - i) - 2);
    return;
  }
}
