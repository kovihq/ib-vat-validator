import { Country } from '../vat';

export const peru: Country = {
  name: 'Peru',
  codes: ['PE', 'PER', ''],
  calcFn: (vat: string[]): boolean => {
    let total = 0;
    const digits = vat[1];

    for (let i = 0; i < 10; i++) {
      total += Number(digits.charAt(i)) * peru.rules.multipliers.common[i];
    }

    total = 11 - (total - Math.trunc(total / 11) * 11);
    if (total > 9) total = 11;

    const expect = Number(vat[2]);
    return total === expect;
  },
  rules: {
    multipliers: {
      common: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
    },
    // 20 48097723 9
    // 10,15,17 y 20,
    regex: [/\b(10[0-9]{8})([0-9])$/, /\b(16[0-9]{8})([0-9])$/, /\b(17[0-9]{8})([0-9])$/, /\b(20[0-9]{8})([0-9])$/],
  },
};
