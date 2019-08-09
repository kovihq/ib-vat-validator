import { Country } from '../vat';

export const portugal: Country = {
  name: 'Portugal',
  codes: ['PT', 'PRT', '620'],
  calcFn: (vat: string[]): boolean => {
    let total = 0;
    const digits = vat[1];

    for (let i = 0; i < 8; i++) {
      total += Number(digits.charAt(i)) * portugal.rules.multipliers.common[i];
    }

    total = 11 - (total % 11);
    if (total > 9) {
      total = 0;
    }

    const expect = Number(digits.slice(8, 9));
    return total === expect;
  },
  rules: {
    multipliers: {
      common: [9, 8, 7, 6, 5, 4, 3, 2],
    },
    regex: [/^(\d{9})$/],
  },
};
