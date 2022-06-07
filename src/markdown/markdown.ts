import { readFile } from 'fs/promises';
import { guaranteeFolderPath, write } from '../libs/file';

function getAuditToTable(audits): string {
  const detail = [
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${audits['first-contentful-paint'].title} | ${audits['first-contentful-paint'].displayValue} |`,
  ].join('\n');

  return detail;
}

export async function generateMarkdown() {
  let audits = JSON.parse(await readFile('report/audits.json', 'utf8'));

  const auditsTable = getAuditToTable(audits);

  guaranteeFolderPath('./history');
  write({ path: `history/${new Date().toString()}-report.md`, content: auditsTable, type: 'string' });
}
