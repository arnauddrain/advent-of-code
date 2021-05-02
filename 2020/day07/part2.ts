export {};

interface Bag {
  parent: string;
  child: {
    name: string;
    number: number;
  }[];
}

const inputs = (await Deno.readTextFile('./input')).matchAll(
  /((.*) bags contain (.*)).\n+/gi
);

const bags: Bag[] = Array.from(inputs).map((line) => ({
  parent: line[2],
  child: Array.from(line[3].matchAll(/(\d) ([\w ]*) bag[s]{0,1}(,|$)/gi)).map(
    (match) => ({
      number: Number(match[1]),
      name: match[2],
    })
  ),
}));

function countBags(parent: string, bags: Bag[]): number {
  const newBags = bags.find((bag) => bag.parent === parent);
  if (newBags?.child.length) {
    console.log(newBags);
    return newBags.child.reduce(
      (acc, child) => acc + child.number * countBags(child.name, bags),
      1
    );
  }
  return 1;
}

console.log(countBags('shiny gold', bags) - 1);
