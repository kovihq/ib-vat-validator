# Create local package

```console
npm pack
```

# Install 

```console
npm i ib-vat-validator
```

# Use

### install

```console
npm i ib-vat-validator
```

To check all

```console
npm run test
```

```ts

import { checkVAT, spain, portugal } from 'ib-vat-validator';

checkVAT('A0011012B', [spain]); // true:  Spain VAT
checkVAT('A0011012B', [spain, portugal]); // true: accept only Spain or Portugal VATs
checkVAT('A0011012B', [portugal]); // false: accept only Spain VAT

For Not European country
checkVAT('GOGF770826MSPMML33', [mexico]); // true:  Mexico VAT

```

# Return value

```ts
checkVAT() returns a Result Object:

export interface VatCheckResult {
    value?: string; // 'A0011012B': your VAT without extra characters (like '-', spaces, '.', etc)
    isValid: boolean; // main result - is VAT correct against provided countries or not
    country?: { // VAT's country (null if not found)
        name: string; // ISO country name of VAT
    };
}
```

# List of Countries:

- Spain
- Portugal
- Argentina
- Peru
- Mexico
- Brazil
- Colombia

# All countries at once

```ts
import { checkVAT, countries } from 'ib-vat-validator';
checkVAT('11444777000161', countries);
```

## Simple function to calculate vat validation digit

---

# Spain

```ts
function isValidCif(cif) {
  if (!cif || cif.length !== 9) {
    return false;
  }

  var letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  var digits = cif.substr(1, cif.length - 2);
  var letter = cif.substr(0, 1);
  var control = cif.substr(cif.length - 1);
  var sum = 0;
  var i;
  var digit;

  if (!letter.match(/[A-Z]/)) {
    return false;
  }

  for (i = 0; i < digits.length; ++i) {
    digit = parseInt(digits[i]);

    if (isNaN(digit)) {
      return false;
    }

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = parseInt(digit / 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  if (sum !== 0) {
    digit = 10 - sum;
  } else {
    digit = sum;
  }

  if (letter.match(/[ABEH]/)) {
    return String(digit) === control;
  }
  if (letter.match(/[NPQRSW]/)) {
    return letters[digit] === control;
  }

  return String(digit) === control || letters[digit] === control;
}
```

# Portugal

```ts

     public taxNumber(str: string): any {
        let nif = str.toUpperCase();
        if (!/(PT)?([123568]\d{1}|45|7[0124579]|9[0189])(\d{7})/.test(nif)) {
            throw new Error('Invalid format');
        }

        nif = nif.replace(/PT/, ''); //remove the PT part
        const checkDigit = (): number => {
            let c: number = 0;
            for (let i: number = 0; i < nif.length - 1; ++i) {
                c += Number(nif[i]) * (10 - i - 1);
            }
            c = 11 - (c % 11);
            return c >= 10 ? 0 : c;
        };

        return checkDigit() === Number(str.charAt(str.length - 1));
    }

```

# Argentina

```ts
function validaCuit(cuit) {
  if (cuit.length != 11) return false;
  else {
    var mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var total = 0;
    for (var i = 0; i < mult.length; i++) {
      total += parseInt(cuit[i]) * mult[i];
    }
    var mod = total % 11;
    var digito = mod == 0 ? 0 : mod == 1 ? 9 : 11 - mod;
  }
  return digito == parseInt(cuit[10]);
}
```

# Peru

```ts
function valruc(valor){

	suma = 0
	x = 6
	for (i=0; i<valor.length-1;i++){
		if ( i == 4 ) x = 8 digito = valor.charAt(i) - '0';
			x--
		if ( i==0 ) suma += (digito*x) else suma += (digito*x) } resto = suma % 11;
			resto = 11 - resto
		if ( resto >= 10) resto = resto - 10;
		if ( resto == valor.charAt( valor.length-1 ) - '0' ){
			return true
		}
	}
	return false
}

```

# Mexico

```ts
function curpValida(curp) {
  var re = /^([A-Z][AEIOU][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AG|B[CS]|C[MSHXOL]|D[G]|G[TR]|HG|JC|EM|M[IO]|N[AL]|OA|PU|Q[TR]|S[LIO]|T[TML]|VE|YU|ZA)[A-Z\d])(\d)$/,
    validado = curp.match(re);

  if (!validado) return false;

  function digitoVerificador(validado[1]) {
    (lngSuma = 0.0), (lngDigito = 0.0);
    for (var i = 0; i < 17; i++)
      lngSuma = lngSuma + '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.indexOf(validado[1].charAt(i)) * (18 - i);
    lngDigito = 10 - (lngSuma % 10);
    if (lngDigito == 10) return 0;
    return lngDigito;
  }

  if (validado[2] != digitoVerificador(validado[1])) return false;

  return true;
}
```

# Brazil

### CPF

```ts
// var strCPF = "12345678909";
function TestaCPF(strCPF) {
  let Resto;
  let Suma = 0;

  for (i = 1; i <= 9; i++) Suma = Suma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Suma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Suma = 0;
  for (i = 1; i <= 10; i++) Suma = Suma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Suma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}
```

### CNPJ

```ts
function validarCNPJ(cnpj) {
  tamano = cnpj.length - 2;
  numeros = cnpj.substring(0, tamano);
  digitos = cnpj.substring(tamano);
  suma = 0;
  pos = tamano - 7;
  for (i = tamano; i >= 1; i--) {
    soma += numeros.charAt(tamano - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = suma % 11 < 2 ? 0 : 11 - (suma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamano = tamano + 1;
  numeros = cnpj.substring(0, tamano);
  suma = 0;
  pos = tamano - 7;
  for (i = tamano; i >= 1; i--) {
    suma += numeros.charAt(tamano - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = suma % 11 < 2 ? 0 : 11 - (suma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}
```

# Colombia

para la validacion de 9 digitos hay que eliminar 43, 47, 53, 59, 67, 71

```ts
function CalcularDigitoVerificacion(nit) {
  const vector = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let total = 0;

  for (let i = 0; i < nit.length; i++) {
    let temp = Math.trunc(Number(nit[nit.length - 1 - i]));
    total = total + temp * vector[i];
  }

  let resto = total % 11;
  return resto > 1 ? 11 - resto : resto;
}
```
