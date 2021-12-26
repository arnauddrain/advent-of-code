export {};

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
  let value = 0;
  let currentIndex = 0;
  const version = binToDec(packet.substr(currentIndex, 3));
  currentIndex += 3;
  const type = binToDec(packet.substr(currentIndex, 3));
  currentIndex += 3;
  if (type === 4) {
    let binValue = '';
    while (packet[currentIndex] === '1') {
      binValue += packet.substr(currentIndex + 1, 4);
      currentIndex += 5;
    }
    value = binToDec(binValue + packet.substr(currentIndex + 1, 4));
    currentIndex += 5;
  } else {
    const subPackets = [];
    const lengthTypeId = packet[currentIndex];
    currentIndex += 1;
    if (lengthTypeId === '0') {
      const length = binToDec(packet.substr(currentIndex, 15));
      currentIndex += 15;
      const indexBeforeSubPackets = currentIndex;
      while (currentIndex - indexBeforeSubPackets < length) {
        const res = parsePacket(packet.substr(currentIndex));
        subPackets.push(res.value);
        currentIndex += res.currentIndex;
      }
    } else {
      const length = binToDec(packet.substr(currentIndex, 11));
      currentIndex += 11;
      for (let i = 0; i < length; i++) {
        const res = parsePacket(packet.substr(currentIndex));
        subPackets.push(res.value);
        currentIndex += res.currentIndex;
      }
    }
    if (type === 0) {
      value = subPackets.reduce((acc, value) => acc + value, 0);
    } else if (type === 1) {
      value = subPackets.reduce((acc, value) => acc * value, 1);
    } else if (type === 2) {
      value = Math.min(...subPackets);
    } else if (type === 3) {
      value = Math.max(...subPackets);
    } else if (type === 5) {
      value = subPackets[0] > subPackets[1] ? 1 : 0;
    } else if (type === 6) {
      value = subPackets[0] < subPackets[1] ? 1 : 0;
    } else if (type === 7) {
      value = subPackets[0] === subPackets[1] ? 1 : 0;
    }
  }
  return { value, currentIndex };
}

const file = await Deno.readTextFile('./input');

const packet = file
  .trim()
  .split('')
  .map((v) => parseInt(v, 16))
  .map((n) => decToBin(n, 0))
  .join('');

const res = parsePacket(packet);

console.log('res is', res);
