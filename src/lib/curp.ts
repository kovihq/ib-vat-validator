export function checkCurp (value: string) {
	function calculaDigito(c:string) {
		var segRaiz      = c.substring(0,17)
		var chrCaracter  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
		var	intFactor    = new Array(17)
		var	lngSuma      = 0.0
		var	lngDigito    = 0.0
		
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
	var reg:RegExp = new RegExp(/[A-Z]{4}\d{6}/)
	var curp = value.toUpperCase();
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