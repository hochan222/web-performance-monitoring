import * as fs from 'fs';
import { readFile } from 'fs/promises';

export async function l2s() {
  let totalMetrics = JSON.parse(await readFile('report/totalMetrics.json', 'utf8'));

  console.log(totalMetrics, totalMetrics.firstContentfulPaint);

  if (!fs.existsSync('./history')) {
    fs.mkdirSync('./history', { recursive: true });
  }
  fs.writeFileSync(`history/${new Date().toString()}-report.md`, JSON.stringify(totalMetrics.firstContentfulPaint));
}
