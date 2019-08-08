import { colombia } from '../index';
import { invalid, valid } from './countries_vat_lists/colombia.vat';
import { checkInValidVat, checkValidVat, addCharsToStringColombia } from './utils';

describe('Colombia', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(vat => checkValidVat(vat, [colombia]));
  });

  it('should return true result for valid VATs with extra point and dash characters', () => {
    valid.map(vat => addCharsToStringColombia(vat, '-')).forEach(vat => checkValidVat(vat, [colombia]));
  });

  it('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringColombia(vat, ' ')).forEach(vat => checkValidVat(vat, [colombia]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [colombia]));
  });
});
