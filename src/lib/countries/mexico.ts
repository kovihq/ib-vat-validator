import { Country } from '../vat';

export const mexico: Country = {
  name: 'Mexico',
  codes: ['ME', 'MEX', ''],
  calcFn: (vat: string[]): boolean => {
    const { regex } = mexico.rules;

    return regex[0].test(vat[0]);
    // if (regex[1].test(vat[0])) return isRFC(vat[1], vat[5]);
  },
  rules: {
    multipliers: {
      common: [],
    },
    // 20 48097723 9
    // 10,15,17 y 20,
    regex: [
      // tslint:disable-next-line
      /^([A-Z][AEIOU][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM]([A-Z]{2})[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
    ],

    // to do additional regex and change regex for initial validation
  },
};

export function isCURP(digits: string, expect: string): boolean {
  let total = 0;

  for (let i = 0; i < 17; i++) {
    total += '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.indexOf(digits.charAt(i)) * (18 - i);
  }

  total = 10 - (total % 10);

  if (Number(total) === 10) total = 0;

  return Number(total) === Number(expect);
}

export function isRFC(digits: string, expect: string): boolean {
  let total: any = 0;

  for (let i = 0; i < 13; i++) {
    total += '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ'.indexOf(digits.charAt(i)) * (13 - i);
  }

  total = 11 - (total % 11);

  if (Number(total) === 11) total = 0;
  if (Number(total) === 10) total = 'A';

  return Number(total) === Number(expect);
}

export function checkCurp (value: string) {
	function calculaDigito(c:string){
		var segRaiz      = c.substring(0,17)
		var chrCaracter  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
		var intFactor    = new Array(17)
		var lngSuma      = 0.0
		var lngDigito    = 0.0
		
		for(var i=0; i<17; i++)	{
			for(var j=0;j<37; j++) {
				if(segRaiz.substring(i,i+1)==chrCaracter.substring(j,j+1)) {  				
					intFactor[i]=j;
				}
			}
		}
		for(var k = 0; k < 17; k++)	{
			lngSuma= lngSuma + ((intFactor[k]) * (18 - k));
		}
		lngDigito= (10 - (lngSuma % 10));
		if(lngDigito==10){lngDigito=0;}
		return lngDigito;
	}
  var curp = value.toUpperCase();
  var reg:RegExp
  
  if (curp === '') { return true; }

	if (curp.length < 18) { return false }

	// Verifica que la curp sea de 18 digitos
	if (curp.length == 18) {
		var digito:any = calculaDigito(curp);
		if(curp.search(/[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9][0-9]/)){
			return false
		}
		
		if(!(parseInt(digito) == parseInt(curp.substring(17,18))))	{
			return false
		}
	}
	else{
		switch (curp.length) {
			case 10 : reg = /[A-Z]{4}\d{6}/; break;
			case 11 : reg = /[A-Z]{4}\d{6}[HM]/; break;
			case 12 : reg = /[A-Z]{4}\d{6}[HM][A-Z]/; break;
			case 13 : reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}/; break;
			case 14 : reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]/; break;
			case 15 : reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{2}/; break;
			case 16 : reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}/; break;
			case 17 : reg = /[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]/; break;
		}
	
		if(curp.search(reg)) {
			return false
		}
	}
	return true
}
