import { Country } from '../vat';

export const colombia: Country = {
  name: 'Colombia',
  codes: ['CO', 'COL', '170'],
  calcFn: (vat: string[]): boolean => {
    let total = 0;
    const digits = vat[1];
    let digit = 0;

    for (let i = 0; i < 9; i++) {
      total += Number(digits.charAt(i)) * colombia.rules.multipliers.common[i];
    }

    total % 11 < 2 ? (digit = total) : (digit = 11 - (total % 11));
    const expect = Number(vat[2]);

    return Number(digit) === expect;
  },
  rules: {
    multipliers: {
      common: [41, 37, 29, 23, 19, 17, 13, 7, 3],
    },
    // 890980136-6
    regex: [/(^[0-9]{9})([0-9]{1})$/],
  },
};
