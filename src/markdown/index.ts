import { readFile } from 'fs/promises';
import { guaranteeFolderPath, write } from '../libs/file';
import { BREAK_LINE, h1, h3, mlist, summary, tAlignLine, tBody, tHead } from './markdown';

function getBootupTime(audits): string[] {
  const { title, details, numericUnit, numericValue, description } = audits['bootup-time'];
  const { headings, items } = details;
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    ...mlist('Unit', [numericUnit]),
    ...mlist('wastedMs', [numericValue]),
    BREAK_LINE,
    tHead(headings.map((heading) => heading.text)),
    tAlignLine(headings.length),
  ];

  items.forEach((item) => {
    const { url, total, scripting, scriptParseCompile } = item;
    content = content.concat(tBody([url, total, scripting, scriptParseCompile]));
  });

  return content;
}

function getAuditToTable(audits): string {
  let detail = [
    h1('Web Performance Report'),
    BREAK_LINE,
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${audits['bootup-time'].title} | ${audits['bootup-time'].displayValue} |`,
    `| ${audits['first-contentful-paint'].title} | ${audits['first-contentful-paint'].displayValue} |`,
    '',
  ];

  detail = detail.concat(getBootupTime(audits));

  return detail.join('\n');
}

export async function generateMarkdown() {
  let audits = JSON.parse(await readFile('report/audits.json', 'utf8'));

  const auditsTable = getAuditToTable(audits);

  guaranteeFolderPath('./history');
  write({ path: `history/${new Date().toString()}-report.md`, content: auditsTable, type: 'string' });
}
