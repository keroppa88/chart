const fs = require('fs');

// 企業物価指数（PR01）の29系列
const codes = [
  'PRCG20_2200000000', 'PRCG20_2200010001', 'PRCG20_2200120001', 'PRCG20_2200220001',
  'PRCG20_2200320001', 'PRCG20_2200420001', 'PRCG20_2200520001', 'PRCG20_2200620001',
  'PRCG20_2200720001', 'PRCG20_2200820001', 'PRCG20_2200920001', 'PRCG20_2201020001',
  'PRCG20_2201120001', 'PRCG20_2201220001', 'PRCG20_2201320001', 'PRCG20_2201420001',
  'PRCG20_2201520001', 'PRCG20_2201620001', 'PRCG20_2201720001', 'PRCG20_2201820001',
  'PRCG20_2201920001', 'PRCG20_2202010001', 'PRCG20_2202020001', 'PRCG20_2202110001',
  'PRCG20_2202120001', 'PRCG20_2202210001', 'PRCG20_2202220001', 'PRCG20_2202310001',
  'PRCG20_2202320001'
];

async function fetchPPITimeseries() {
  const db = 'PR01';
  const codeParam = codes.join(',');
  // 時系列データ取得用URL
  const url = `https://www.stat-search.boj.or.jp/api/v1/getDataCode?format=csv&lang=jp&db=${db}&code=${codeParam}`;

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 指定されたファイル名で出力
    const fileName = './bojapi_kigyobukka.csv';
    fs.writeFileSync(fileName, buffer);
    
    console.log(`Saved: ${fileName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchPPITimeseries();