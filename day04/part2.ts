export {};

interface Condition {
  endsWith: string;
}

interface Rule {
  field: string;
  type: 'required' | 'number' | 'match' | 'list';
  min?: number;
  max?: number;
  pattern?: RegExp;
  list?: string[];
  conditions?: Condition[];
}

interface Field {
  key: string;
  value: string;
}

const inputs = (await Deno.readTextFile('./input')).split('\n\n').map((input) =>
  input.split(/ |\n/).map(
    (field): Field => {
      const txt = field.split(':');
      return { key: txt[0], value: txt[1] };
    }
  )
);

const rules: Rule[] = [
  { field: 'byr', type: 'required' },
  { field: 'byr', type: 'number', min: 1920, max: 2002 },
  { field: 'iyr', type: 'required' },
  { field: 'iyr', type: 'number', min: 2010, max: 2020 },
  { field: 'eyr', type: 'required' },
  { field: 'eyr', type: 'number', min: 2020, max: 2030 },
  { field: 'hgt', type: 'required' },
  { field: 'hgt', type: 'match', pattern: /^\d*(cm|in)$/ },
  {
    field: 'hgt',
    type: 'number',
    min: 150,
    max: 193,
    conditions: [{ endsWith: 'cm' }],
  },
  {
    field: 'hgt',
    type: 'number',
    min: 59,
    max: 76,
    conditions: [{ endsWith: 'in' }],
  },
  { field: 'hcl', type: 'required' },
  { field: 'hcl', type: 'match', pattern: /^#(\d|[a-f]){6}$/ },
  { field: 'ecl', type: 'required' },
  {
    field: 'ecl',
    type: 'list',
    list: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],
  },
  { field: 'pid', type: 'required' },
  { field: 'pid', type: 'match', pattern: /^\d{9}$/ },
];

function validateCondition(condition: Condition, field: Field) {
  return field.value.endsWith(condition.endsWith);
}

function validateRule(rule: Rule, passport: Field[]) {
  const field = passport.find((e) => e.key === rule.field);
  if (
    field &&
    rule.conditions &&
    rule.conditions.filter((condition) => validateCondition(condition, field))
      .length !== rule.conditions.length
  ) {
    return true;
  }
  switch (rule.type) {
    case 'required':
      if (!field) {
        console.log(rule.field, ' invalid:\t', 'missing');
        return false;
      }
      break;
    case 'number':
      if (field) {
        const numberValue = parseInt(field.value);
        if (
          numberValue === NaN ||
          (rule.min && numberValue < rule.min) ||
          (rule.max && numberValue > rule.max)
        ) {
          console.log(rule.field, ' invalid:\t', field.value);
          return false;
        }
      }
      break;
    case 'match':
      if (field) {
        if (rule.pattern && !field.value.match(rule.pattern)) {
          console.log(rule.field, ' invalid:\t', field.value);
          return false;
        }
      }
      break;
    case 'list':
      if (field) {
        if (rule.list && !rule.list.includes(field.value)) {
          console.log(rule.field, ' invalid:\t', field.value);
          return false;
        }
      }
      break;
  }
  return true;
}

console.log(
  inputs.filter((passport) => {
    return (
      rules.filter((rule) => validateRule(rule, passport)).length ===
      rules.length
    );
  }).length,
  'valid passports'
);
