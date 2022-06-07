import * as fs from 'fs';

const totalMetrics = require('../report/totalMetrics.json');

export function l2s() {
  console.log(totalMetrics, totalMetrics.firstContentfulPaint);

  if (!fs.existsSync('./history')) {
    fs.mkdirSync('./history', { recursive: true });
  }
  fs.writeFileSync(`history/${new Date().toString()}-report.md`, JSON.stringify(totalMetrics.firstContentfulPaint));
}
