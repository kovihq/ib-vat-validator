import { spain, portugal, argentina, peru } from './lib/countries';
import { Country } from './lib/vat';

const countries: ReadonlyArray<Country> = [spain, portugal, argentina, peru];

export { countries };

export { spain, portugal, argentina, peru } from './lib/countries';

export { checkVAT, Rules, Country, Multipliers, VatCheckResult } from './lib/vat';
