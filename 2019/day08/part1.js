const image = require('../filereader.js').readFile('\n', false)[0];

function getFewerWhite(image) {
  let layerIndex = 0;
  let less0 = -1;
  let current0 = 0;
  for (var i = 0; i < image.length; i++) {
    if (image[i] === '0') {
      current0++;
    }
    if ((i + 1) % (25 * 6) === 0) {
      if (less0 === -1 || current0 < less0) {
        less0 = current0;
        layerIndex = Math.floor(i / (25 * 6));
      }
      current0 = 0;
    }
  }
  return layerIndex;
}

const layerIndex = getFewerWhite(image);
let digit1 = 0;
let digit2 = 0;

const startIndex = 25 * 6 * layerIndex;
const endIndex = 25 * 6 * (layerIndex + 1);
for (var i = startIndex; i < endIndex; i++) {
  digit1 += (image[i] === '1');
  digit2 += (image[i] === '2');
}

console.log(digit1 * digit2);
