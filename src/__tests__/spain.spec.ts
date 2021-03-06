import { spain } from '../index';
import { invalid, valid } from './countries_vat_lists/spain.vat';
import { checkInValidVat, checkValidVat, addCharsToStringSpain } from './utils';

describe('Spain', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(vat => checkValidVat(vat, [spain]));
  });

  it.skip('should return true result for valid VATs with extra dash characters', () => {
    valid.map(vat => addCharsToStringSpain(vat, '-')).forEach(vat => checkValidVat(vat, [spain]));
  });

  it.skip('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringSpain(vat, ' ')).forEach(vat => checkValidVat(vat, [spain]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [spain]));
  });
});
