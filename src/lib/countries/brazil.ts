import { Country } from '../vat';

export const brazil: Country = {
  name: 'Brazil',
  codes: ['BR', 'BRA', '076'],
  calcFn: (vat: string[]): boolean => {
    const { regex } = brazil.rules;

    if (regex[1].test(vat[0])) return isCPF(vat[1], vat[2]);

    if (regex[0].test(vat[0])) return isCNPJ(vat[1], vat[2]);

    return false;
  },
  rules: {
    multipliers: {
      common: [10, 9, 8, 7, 6, 5, 4, 3, 2],
    },
    regex: [/^([0-9]{2}[0-9]{3}[0-9]{3}[0-9]{4})([0-9]{2})$/, /^([0-9]{3}[0-9]{3}[0-9]{3})([0-9]{2})$/],
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

export function isCPF(digits: string, expect: string) {
  let multipliers: number[] = [11];

  const firstControlDigit = calcDigit(digits, brazil.rules.multipliers.common);
  multipliers = multipliers.concat(brazil.rules.multipliers.common);

  const secondControlDigit = calcDigit(digits.concat(String(firstControlDigit)), multipliers);
  const control = '' + firstControlDigit + secondControlDigit;

  return Number(control) === Number(expect);
}

export function isCNPJ(digits: string, expect: string) {
  const multipliers: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstControlDigit = calcDigit(digits, multipliers);

  multipliers.unshift(6);

  const secondControlDigit = calcDigit(digits.concat(String(firstControlDigit)), multipliers);
  const control = '' + firstControlDigit + secondControlDigit;

  return Number(control) === Number(expect);
}
