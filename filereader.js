exports.readFile = () => require('fs').readFileSync('input', 'utf-8').split('\n').filter(Boolean).map(n => parseInt(n));
