const image = require('../filereader.js').readFile('\n', false)[0];

const layers = image.match(/.{150}/g);

let finalImage = '';
for (var i = 0; i < 150; i++) {
  let layerIndex = 0;
  while (layers[layerIndex][i] === '2') {
    layerIndex++;
  }
  const color = layers[layerIndex][i];
  finalImage += (color === '1') ? '.' : ' ';
  if ((i + 1) % 25 === 0) {
    finalImage += '\n';
  }
}

console.log(finalImage);
