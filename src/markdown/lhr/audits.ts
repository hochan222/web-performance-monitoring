import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { BREAK_LINE, h1, h3, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

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

function getAuditToTable(audits): string[] {
  let detail = [
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${audits['bootup-time'].title} | ${audits['bootup-time'].displayValue} |`,
    `| ${audits['first-contentful-paint'].title} | ${audits['first-contentful-paint'].displayValue} |`,
    `| ${audits['largest-contentful-paint'].title} | ${audits['largest-contentful-paint'].displayValue} |`,
    `| ${audits['speed-index'].title} | ${audits['speed-index'].displayValue} |`,
    `| ${audits['cumulative-layout-shift'].title} | ${audits['cumulative-layout-shift'].displayValue} |`,
    `| ${audits['first-meaningful-paint'].title} | ${audits['first-meaningful-paint'].displayValue} |`,
    `| ${audits['interactive'].title} | ${audits['interactive'].displayValue} |`,
    `| ${audits['server-response-time'].title} | ${audits['server-response-time'].displayValue} |`,
    `| ${audits['total-blocking-time'].title} | ${audits['total-blocking-time'].displayValue} |`,
    '',
  ];

  detail = detail.concat(getBootupTime(audits));

  return detail;
}

export async function generateAuditsMarkdown(path): Promise<string[]> {
  let audits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits);
}
