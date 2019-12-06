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

function findWay(seekedPlanet, planets, list) {
  for (let key in planets) {
    if (!planets.hasOwnProperty(key)) continue;
    const planet = planets[key];
    if (planet.indexOf(seekedPlanet) !== -1) {
      console.log(key);
      list.unshift(planet)
      findWay(planet, planets, list);
    }
  }
  return;
}

let youList = [];
findWay(planets['YOU'], planets, youList);
let santaList = [];
findWay(planets['SAN'], planets, santaList);

for (var i = 0; i < youList.length; i++) {
  if (santaList[i] !== youList[i]) {
    console.log(santaList.length, youList.length, i);
    console.log(santaList.length - i + (youList.length - i));
    return;
  }
}
