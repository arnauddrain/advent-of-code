console.time('main');

function checkPassword(password) {
  let matched = false;
  for (var i = 1; i < 6; i++) {
    if (password[i] === password[i - 1]) {
      matched = true;
    }
    if (password[i - 1] > password[i]) {
      return false;
    }
  }
  return matched;
}

const range = require('../filereader.js').readFile('-');
let total = 0;
for (let password = range[0]; password <= range[1]; password++) {
  total += checkPassword(password.toString());
}

console.timeEnd('main');
console.log(total);
