export {};

let totalVersion = 0;

function decToBin(n: number, depth: number): string {
  if (depth < 3) {
    return decToBin(Math.floor(n / 2), depth + 1) + (n % 2);
  } else {
    return (n % 2).toString();
  }
}

function binToDec(s: string) {
  let number = 0;
  let incr = 1;
  for (let i = 0; i < s.length; i++) {
    if (s[s.length - i - 1] === '1') {
      number += incr;
    }
    incr *= 2;
  }
  return number;
}

function parsePacket(packet: string) {
  let currentIndex = 0;
  const version = binToDec(packet.substr(currentIndex, 3));
  totalVersion += version;
  currentIndex += 3;
  const type = binToDec(packet.substr(currentIndex, 3));
  currentIndex += 3;
  if (type === 4) {
    while (packet[currentIndex] === '1') {
      currentIndex += 5;
    }
    currentIndex += 5;
  } else {
    const lengthTypeId = packet[currentIndex];
    currentIndex += 1;
    if (lengthTypeId === '0') {
      const length = binToDec(packet.substr(currentIndex, 15));
      currentIndex += 15;
      const indexBeforeSubPackets = currentIndex;
      while (currentIndex - indexBeforeSubPackets < length) {
        currentIndex += parsePacket(packet.substr(currentIndex));
      }
    } else {
      const length = binToDec(packet.substr(currentIndex, 11));
      currentIndex += 11;
      for (let i = 0; i < length; i++) {
        currentIndex += parsePacket(packet.substr(currentIndex));
      }
    }
  }
  return currentIndex;
}

const file = await Deno.readTextFile('./input');

const packet = file
  .trim()
  .split('')
  .map((v) => parseInt(v, 16))
  .map((n) => decToBin(n, 0))
  .join('');

parsePacket(packet);

console.log('total version is', totalVersion);
