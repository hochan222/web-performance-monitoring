import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { BREAK_LINE, h1, h3, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

function getBootupTime(audits, staticAudits): string[] {
  const { numericValue, items } = audits['bootup-time'];
  const { title, details, numericUnit, description } = staticAudits['bootup-time'];
  const { headings } = details;
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

function getAuditToTable(audits, staticAudits): string[] {
  let detail = [
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${staticAudits['bootup-time'].title} | ${audits['bootup-time'].displayValue} |`,
    `| ${staticAudits['first-contentful-paint'].title} | ${staticAudits['first-contentful-paint'].displayValue} |`,
    `| ${staticAudits['largest-contentful-paint'].title} | ${staticAudits['largest-contentful-paint'].displayValue} |`,
    `| ${staticAudits['speed-index'].title} | ${staticAudits['speed-index'].displayValue} |`,
    `| ${staticAudits['cumulative-layout-shift'].title} | ${staticAudits['cumulative-layout-shift'].displayValue} |`,
    `| ${staticAudits['first-meaningful-paint'].title} | ${staticAudits['first-meaningful-paint'].displayValue} |`,
    `| ${staticAudits['interactive'].title} | ${staticAudits['interactive'].displayValue} |`,
    `| ${staticAudits['server-response-time'].title} | ${staticAudits['server-response-time'].displayValue} |`,
    `| ${staticAudits['total-blocking-time'].title} | ${staticAudits['total-blocking-time'].displayValue} |`,
    '',
  ];

  detail = detail.concat(getBootupTime(audits, staticAudits));

  return detail;
}

export async function generateAuditsMarkdown(path, audits): Promise<string[]> {
  let staticAudits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits, staticAudits);
}
