export {};

const inputs = (await Deno.readTextFile('./input')).split('\n\n').map((input) =>
  input.split(/ |\n/).map((field) => {
    const txt = field.split(':');
    return { key: txt[0], value: txt[1] };
  })
);

console.log(
  inputs.filter((passport) => {
    return (
      ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].filter(
        (field) => !passport.find((e) => e.key === field)
      ).length === 0
    );
  }).length,
  'valid passports'
);
