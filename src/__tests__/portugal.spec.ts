import { portugal } from '../index';
import { invalid, valid } from './countries_vat_lists/portugal.vat';
import { checkInValidVat, checkValidVat } from './utils';

describe('Portugal', () => {
  it('should return true result for valid VATs', () => {
    valid.forEach(vat => checkValidVat(vat, [portugal]));
  });

  it('should return false result for invalid VATs', () => {
    invalid.forEach(vat => checkInValidVat(vat, [portugal]));
  });
});
