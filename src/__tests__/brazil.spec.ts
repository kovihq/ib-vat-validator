import { brazil } from '../index';
import { invalid, valid } from './countries_vat_lists/argentina.vat';
import { checkInValidVat, checkValidVat, addCharsToStringBrazil } from './utils';

describe('Brazil', () => {
  it.skip('should return true result for valid VATs', () => {
    valid.forEach(async vat => await checkValidVat(vat, [brazil]));
  });

  it.skip('should return true result for valid VATs with extra dash characters', () => {
    valid.map(vat => addCharsToStringBrazil(vat, '.', '-')).forEach(vat => checkValidVat(vat, [brazil]));
  });

  it.skip('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringBrazil(vat, ' ')).forEach(vat => checkValidVat(vat, [brazil]));
  });

  it.skip('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [brazil]));
  });
});
