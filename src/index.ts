import { spain, portugal, argentina, peru, mexico } from './lib/countries';
import { Country } from './lib/vat';

const countries: ReadonlyArray<Country> = [spain, portugal, argentina, peru, mexico];

export { countries };

export { spain, portugal, argentina, peru, mexico } from './lib/countries';

export { checkVAT, Rules, Country, Multipliers, VatCheckResult } from './lib/vat';
