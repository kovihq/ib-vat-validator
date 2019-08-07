import { checkVAT, Country } from '../index';

export function checkValidVat(vat: string, countriesList: Country[]) {
  const result = checkVAT(vat, countriesList);
  if (!result.isValid) console.info('Invalid VAT:', vat);
  expect(result.isValid).toBe(true);
}

export function checkInValidVat(vat: string, countriesList: Country[]) {
  const result = checkVAT(vat, countriesList);

  if (result.isValid) console.info('Following VAT should be invalid:', vat);
  expect(result.isValid).toBe(false);
}

export function addCharsToString(item: string, char: string) {
  const val = item.split('');
  val.splice(3, 0, char);
  val.splice(7, 0, char);
  return val.join('');
}

export function addCharsToStringArgentina(item: string, char: string) {
  const val = item.split('');
  val.splice(2, 0, char);
  val.splice(11, 0, char);
  return val.join('');
}
