import { mexico } from '../index';
import { invalid, valid } from './countries_vat_lists/mexico.vat';
import { checkInValidVat, checkValidVat, addCharsToStringMexico } from './utils';

describe('Mexico', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(vat => checkValidVat(vat, [mexico]));
  });

  it('should return true result for valid VATs with extra dash characters', () => {
    valid.map(vat => addCharsToStringMexico(vat, '-')).forEach(vat => checkValidVat(vat, [mexico]));
  });

  it('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringMexico(vat, ' ')).forEach(vat => checkValidVat(vat, [mexico]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [mexico]));
  });
});
