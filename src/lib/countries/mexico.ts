import { Country } from '../vat';

export const mexico: Country = {
  name: 'Mexico',
  codes: ['ME', 'MEX', ''],
  calcFn: (vat: string[]): boolean => {
    const { regex } = mexico.rules;

    if (regex[0].test(vat[0])) return isCURP(vat[1], vat[2]);
    if (regex[1].test(vat[0])) return isRFC(vat[1], vat[5]);

    return false;
  },
  rules: {
    multipliers: {
      common: [],
    },
    // 20 48097723 9
    // 10,15,17 y 20,
    regex: [
      // tslint:disable-next-line
      /^([A-Z][AEIOU][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AG|B[CS]|C[MSHXOL]|D[G]|G[TR]|HG|JC|EM|M[IO]|N[AL]|OA|PU|Q[TR]|S[LIO]|T[TML]|VE|YU|ZA)[A-Z\d])(\d)$/
    ],

    // to do additional regex and change regex for initial validation
  },
};

export function isCURP(digits: string, expect: string): boolean {
  let total = 0;

  for (let i = 0; i < 17; i++) {
    total += '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.indexOf(digits.charAt(i)) * (18 - i);
  }

  total = 10 - (total % 10);

  if (Number(total) === 10) total = 0;

  return Number(total) === Number(expect);
}

export function isRFC(digits: string, expect: string): boolean {
  let total: any = 0;

  for (let i = 0; i < 13; i++) {
    total += '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ'.indexOf(digits.charAt(i)) * (13 - i);
  }

  total = 11 - (total % 11);

  if (Number(total) === 11) total = 0;
  if (Number(total) === 10) total = 'A';

  return Number(total) === Number(expect);
}
