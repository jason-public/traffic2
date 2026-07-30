const fs = require('fs');
const code = fs.readFileSync('src/data.ts', 'utf8');

const arrStr = code.substring(code.indexOf('export const autoSales = ['), code.indexOf('export const autoDismantle = ['));
const matches = [...arrStr.matchAll(/address:\s*'([^']+)'/g)];

const getDisplayRegion = (address) => {
    const rawRegion = address.split(' ')[0];
    if (rawRegion === '금곡로' || rawRegion === '홍유릉로') return '금곡동';
    if (rawRegion === '경춘로') return '평내동';
    if (rawRegion === '늘을1로') return '호평동';
    return rawRegion;
  };

const counts = {};
for (const match of matches) {
  const address = match[1];
  const region = getDisplayRegion(address);
  counts[region] = (counts[region] || 0) + 1;
}
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(sorted.slice(0, 10));
