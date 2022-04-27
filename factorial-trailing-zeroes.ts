export const zeroes = (base: number, num: number) => {
  const basePrimes = primeFactors(base)
  return Math.min(...Object.keys(basePrimes).map(p => Math.floor(legendreFormula(Number(p), num)/basePrimes[p])))
}

function legendreFormula(prime: number, num: number) {
  let i = 1;
  let term = 1;
  let out = 0;
  while(term > 0) {
    term = Math.floor(num/Math.pow(prime, i++))
    out += term;
  }
  return out;
}

function primeFactors(n: number) {
  let out = {};

  while(n % 2 == 0) {
    out[2] = out[2] ? out[2]+1 : 1;
    n/=2
  }

  for(let i = 3; i <= Math.floor(Math.sqrt(n)); i+=2) {
    while(n % i == 0) {
      out[i] = out[i] ? out[i]+1 : 1;
      n/=i
    }
  }

  if(n > 2) out[n] = out[n] ? out[n]+1 : 1;

  return out
}
