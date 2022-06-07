import * as fs from 'fs';
// const COLLECTED_METRICS = new Map(['first-contentful-paint'].map((x) => [x.toLocaleLowerCase(), x]));

function getMetrics(audits) {
  return audits.metrics.details.items[0];
}

export function reportAudits(lhr) {
  const { audits } = lhr;

  if (!fs.existsSync('./report')) {
    fs.mkdirSync('./report', { recursive: true });
  }
  fs.writeFileSync('report/totalMetrics.json', JSON.stringify(getMetrics(audits)));

  return;
}
