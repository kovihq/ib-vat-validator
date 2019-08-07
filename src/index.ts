import { spain, portugal, argentina } from './lib/countries';
import { Country } from './lib/vat';

const countries: ReadonlyArray<Country> = [spain, portugal, argentina];

export { countries };

export { spain, portugal, argentina } from './lib/countries';

export { checkVAT, Rules, Country, Multipliers, VatCheckResult } from './lib/vat';
