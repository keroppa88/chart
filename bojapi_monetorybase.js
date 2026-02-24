const fs = require('fs');

// 指定された3系列のコード
const codes = [
  'MABS1AN11',     // マネタリーベース平均残高
  'MABS1AN113',    // マネタリーベース平均残高／うち 日銀当座預金
  'MABS1AA12X12'   // マネタリーベース平均残高（準備率調整後）＜季節調整済＞
];

async function fetchMonetaryBase() {
  const db = 'MD01'; // マネタリーベースのDB名
  const codeParam = codes.join(',');
  // 期間指定なしで全期間の時系列データを取得
  const url = `https://www.stat-search.boj.or.jp/api/v1/getDataCode?format=csv&lang=jp&db=${db}&code=${codeParam}`;

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 指定されたファイル名で出力
    const fileName = './bojapi_monetarybase.csv';
    fs.writeFileSync(fileName, buffer);
    
    console.log(`Saved: ${fileName}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchMonetaryBase();