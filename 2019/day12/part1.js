const moonsStr = require('../filereader.js').readFile('\n', false);

const moons = [];
moonsStr.forEach(moonStr => {
  const numerics = moonStr.substr(3).split('=').map(e => parseInt(e));
  moons.push({
    x: numerics[0],
    y: numerics[1],
    z: numerics[2],
  });
});

moons.forEach(moon => moon.velocity = { x: 0, y: 0, z: 0 });

for (var i = 0; i < 1000; i++) {
  moons.forEach(computingMoon => {
    moons.forEach(otherMoon => {
      computingMoon.velocity.x += (computingMoon.x < otherMoon.x) - (computingMoon.x > otherMoon.x);
      computingMoon.velocity.y += (computingMoon.y < otherMoon.y) - (computingMoon.y > otherMoon.y);
      computingMoon.velocity.z += (computingMoon.z < otherMoon.z) - (computingMoon.z > otherMoon.z);
    });
  });
  moons.forEach(moon => {
    moon.x += moon.velocity.x;
    moon.y += moon.velocity.y;
    moon.z += moon.velocity.z;
  });
}

let energy = 0;

moons.forEach(moon => {
  const pot = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
  const kin = Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z);
  energy += pot * kin;
});

console.log('energy', energy)
