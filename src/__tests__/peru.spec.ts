import { peru } from '../index';
import { invalid, valid } from './countries_vat_lists/peru.vat';
import { checkInValidVat, checkValidVat, addCharsToStringArgentina } from './utils';

describe('Peru', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(vat => checkValidVat(vat, [peru]));
  });

  it('should return true result for valid VATs with extra dash characters', () => {
    valid.map(vat => addCharsToStringArgentina(vat, '-')).forEach(vat => checkValidVat(vat, [peru]));
  });

  it('should return true result for valid VATs with extra space characters', () => {
    valid.map(vat => addCharsToStringArgentina(vat, ' ')).forEach(vat => checkValidVat(vat, [peru]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [peru]));
  });
});
