import { Country } from '../vat';

export const spain: Country = {
  name: 'Spain',
  codes: ['ES', 'ESP', '724'],
  calcFn: (vat: string[]): boolean => {
    const digits = vat[0];

    const { regex, multipliers } = spain.rules;

    if (regex[0].test(digits)) return isNationalJuridicalEntities(digits, multipliers.common);

    if (regex[1].test(digits)) return isNonNationalJuridical(digits, multipliers.common);

    if (regex[2].test(digits)) return isPersonalYtoZ(digits);

    if (regex[3].test(digits)) return isPersonalKtoX(digits);

    return false;
  },
  rules: {
    multipliers: {
      common: [2, 1, 2, 1, 2, 1, 2],
    },
    regex: [/^[A-H|J|U|V]\d{8}$/, /^[A-H|N-S|W]\d{7}[A-J]$/, /^[0-9|Y|Z]\d{7}[A-Z]$/, /^[K|L|M|X]\d{7}[A-Z]$/],
  },
};

function extractDigitAndMultiplyByCounter(vat: string, multipliers: ReadonlyArray<number>, total: number): number {
  let temp: number;
  let result = total;
  for (let i = 0; i < 7; i++) {
    temp = Number(vat.charAt(i + 1)) * multipliers[i];
    if (temp > 9) {
      result += Math.floor(temp / 10) + (temp % 10);
    } else {
      result += temp;
    }
  }
  return result;
}

function isNationalJuridicalEntities(vat: string, multipliers: ReadonlyArray<number>): boolean {
  let total = extractDigitAndMultiplyByCounter(vat, multipliers, 0);
  total = 10 - (total % 10);
  if (total === 10) {
    total = 0;
  }

  const expect = Number(vat.slice(8, 9));
  return total === expect;
}

function isNonNationalJuridical(vat: string, multipliers: ReadonlyArray<number>): boolean {
  let total = extractDigitAndMultiplyByCounter(vat, multipliers, 0);

  total = 10 - (total % 10);
  const totalStr = String.fromCharCode(total + 64);

  const expect = vat.slice(8, 9);
  return totalStr === expect;
}

function isPersonalYtoZ(vat: string): boolean {
  let tempNumber = vat;
  if (tempNumber.substring(0, 1) === 'Y') tempNumber = tempNumber.replace(/Y/, '1');
  if (tempNumber.substring(0, 1) === 'Z') tempNumber = tempNumber.replace(/Z/, '2');
  const expect = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(+tempNumber.substring(0, 8) % 23);
  return tempNumber.charAt(8) === expect;
}

function isPersonalKtoX(vat: string): boolean {
  const expect = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(Number(vat.substring(1, 8)) % 23);
  return vat.charAt(8) === expect;
}
