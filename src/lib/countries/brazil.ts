import { Country } from '../vat';

export const brazil: Country = {
  name: 'Brazil',
  codes: ['BR', 'BRA', '076'],
  calcFn: (vat: string[]): boolean => {
    let total = 0;
    const digits = vat[2];
    let firstControlDigit = 0;
    let secondControlDigit = 0;

    for (let i = 0; i < 10; i++) {
      total += Number(digits.charAt(i)) * brazil.rules.multipliers.common[i];
    }

    total % 11 < 2 ? (firstControlDigit = 0) : (firstControlDigit = 11 - (total % 11));

    digits.concat(String(firstControlDigit));
    brazil.rules.multipliers.common.unshift(11);

    for (let i = 0; i < 11; i++) {
      total += Number(digits.charAt(i)) * brazil.rules.multipliers.common[i];
    }
    total % 11 < 2 ? (secondControlDigit = 0) : (secondControlDigit = 11 - (total % 11));

    const expect = Number(digits.slice(8, 9));
    return total === expect;
  },
  rules: {
    multipliers: {
      common: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    },
    regex: [
      /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/,
    ],
  },
};
