import { spain, portugal, argentina, peru, mexico, brazil, colombia } from './lib/countries';
import { Country } from './lib/vat';

const countries: ReadonlyArray<Country> = [spain, portugal, argentina, peru, mexico, brazil, colombia];

export { countries };

export { spain, portugal, argentina, peru, mexico, brazil, colombia } from './lib/countries';

export { checkVAT, Rules, Country, Multipliers, VatCheckResult } from './lib/vat';

export { checkCurp } from './lib/curp';
