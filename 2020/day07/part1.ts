export {};

interface Bag {
  parent: string;
  child: string[];
}

const inputs = (await Deno.readTextFile('./input')).matchAll(
  /((.*) bags contain (.*)).\n+/gi
);

const bags: Bag[] = Array.from(inputs).map((line) => ({
  parent: line[2],
  child: Array.from(line[3].matchAll(/\d ([\w ]*) bag[s]{0,1}(,|$)/gi)).map(
    (match) => match[1]
  ),
}));

function findBags(itemsSearch: Bag[], bags: Bag[]): Bag[] {
  const newBags = bags.filter((bag) =>
    itemsSearch.some((search) => bag.child.includes(search.parent))
  );
  if (newBags.length) {
    const parents = newBags.map((bag) => bag.parent);
    return newBags.concat(
      findBags(
        newBags,
        bags.filter((bag) => !parents.includes(bag.parent))
      )
    );
  }
  return [];
}

console.log(findBags([{ parent: 'shiny gold', child: [] }], bags).length);
