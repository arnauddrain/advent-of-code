exports.readFile = (separator = '\n') => {
  return require('fs').readFileSync('input', 'utf-8').split(separator).filter(Boolean).map(n => parseInt(n));
}
