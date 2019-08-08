import { brazil } from '../index';
import { invalid, valid } from './countries_vat_lists/brazil.vat';
import { checkInValidVat, checkValidVat, addCharsToStringBrazil } from './utils';

describe('Brazil', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(async vat => await checkValidVat(vat, [brazil]));
  });

  it('should return true result for valid VATs with extra point and dash characters', () => {
    valid.map(vat => addCharsToStringBrazil(vat, '.', '-')).forEach(vat => checkValidVat(vat, [brazil]));
  });

  it('should return true result for valid VATs with extra point characters', () => {
    valid.map(vat => addCharsToStringBrazil(vat, '.')).forEach(vat => checkValidVat(vat, [brazil]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [brazil]));
  });
});
