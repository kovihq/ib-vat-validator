import { Country } from '../vat';

export const colombia: Country = {
  name: 'Colombia',
  codes: ['CO', 'COL', '170'],
  calcFn: (vat: string[]): boolean => {
    const { regex } = colombia.rules;

    if (regex[0].test(vat[0])) return calNit15(vat[1], vat[2]);

    if (regex[1].test(vat[0])) return calNit9(vat[1], vat[2]);

    return false;
  },
  rules: {
    multipliers: {
      common: [41, 37, 29, 23, 19, 17, 13, 7, 3],
    },
    // 890980136-6
    regex: [/(^[0-9]{15})([0-9]{1})$/, /(^[0-9]{9})([0-9]{1})$/],
  },
};

function calNit9(digits: string, expect: string) {
  let total = 0;
  let digit = 0;

  for (let i = 0; i < 9; i++) {
    total += Number(digits.charAt(i)) * colombia.rules.multipliers.common[i];
  }

  total % 11 < 2 ? (digit = total) : (digit = 11 - (total % 11));

  return Number(digit) === Number(expect);
}

function calNit15(digits: string, expect: string) {
  let total = 0;
  let digit = 0;
  let multipliers: number[] = [71, 67, 59, 53, 47, 43];

  multipliers = multipliers.concat(colombia.rules.multipliers.common);

  for (let i = 0; i < 15; i++) {
    total += Number(digits.charAt(i)) * colombia.rules.multipliers.common[i];
  }

  total % 11 < 2 ? (digit = total) : (digit = 11 - (total % 11));

  return Number(digit) === Number(expect);
}
