import { Country } from '../vat';

export const argentina: Country = {
  name: 'Argentina',
  codes: ['AR', 'ARG', '032'],
  calcFn: (vat: string[]): boolean => {
    let total = 0;
    const digits = vat[1];

    for (let i = 0; i < 10; i++) {
      total += Number(digits.charAt(i)) * argentina.rules.multipliers.common[i];
    }

    total = 11 - (total % 11);

    if (total == 11) {
      total = 0;
    }

    const expect = Number(vat[2]);
    return expect == total;
  },
  rules: {
    multipliers: {
      common: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
    },
    //'30-71096961-9',
    regex: [
      /\b(20[0-9]{8})([0-9])$/,
      /\b(23[0-9]{8})([0-9])$/,
      /\b(24[0-9]{8})([0-9])$/,
      /\b(27[0-9]{8})([0-9])$/,
      /\b(30[0-9]{8})([0-9])$/,
      /\b(33[0-9]{8})([0-9])$/,
      /\b(34[0-9]{8})([0-9])$/,
    ],
  },
};
