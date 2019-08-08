import { Country } from '../vat';

export const brazil: Country = {
  name: 'Brazil',
  codes: ['BR', 'BRA', '076'],
  calcFn: (vat: string[]): boolean => {
    const digits = vat[1];
    let multipliers: number[] = [11];

    let firstControlDigit = calcDigit(digits, brazil.rules.multipliers.common);
    // to do - find better way for create array

    multipliers = multipliers.concat(brazil.rules.multipliers.common);

    let secondControlDigit = calcDigit(digits.concat(String(firstControlDigit)), multipliers);

    let control = '' + firstControlDigit + secondControlDigit;

    const expect = Number(vat[2]);

    return Number(control) === expect;
  },
  rules: {
    multipliers: {
      common: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    },
    regex: [/([0-9]{3}[0-9]{3}[0-9]{3})([0-9]{2})$/],
  },
};

function calcDigit(digits: string, multipliers: number[]): number {
  let total = 0;
  let digit = 0;

  for (let i = 0; i < multipliers.length; i++) {
    total += Number(digits.charAt(i)) * multipliers[i];
  }

  total % 11 < 2 ? (digit = 0) : (digit = 11 - (total % 11));

  return digit;
}
