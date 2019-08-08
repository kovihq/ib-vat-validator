import { argentina } from '../index';
import { invalid, valid } from './countries_vat_lists/argentina.vat';
import { checkInValidVat, checkValidVat, addCharsToStringArgentina } from './utils';

describe('Argentina', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(async vat => await checkValidVat(vat, [argentina]));
  });

  it('should return true result for valid VATs with extra dash characters', () => {
    valid.map(vat => addCharsToStringArgentina(vat, '-')).forEach(vat => checkValidVat(vat, [argentina]));
  });

  it('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringArgentina(vat, ' ')).forEach(vat => checkValidVat(vat, [argentina]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [argentina]));
  });
});
