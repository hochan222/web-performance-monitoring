import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { kebabCaseToString, toFixedTwo } from '../../libs/utils';
import { BREAK_LINE, h3, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

function getAppleTouchIcon(appleTouchIcon, tempAppleTouchIcon): string {
  const { score } = appleTouchIcon;
  const { id } = tempAppleTouchIcon;
  const content = tBody([kebabCaseToString(id), score === 1 ? '✅' : '❌']);
  return content;
}

function getBootupTime(bootupTime, tempBootupTime): string[] {
  const { numericValue } = bootupTime;
  const { title, details, numericUnit, description } = tempBootupTime;
  const { headings, items } = details;
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    ...mlist('Unit', [numericUnit]),
    ...mlist('wastedMs', [toFixedTwo(numericValue)]),
    BREAK_LINE,
    tHead(headings.map((heading) => heading.text)),
    tAlignLine(headings.length),
  ];

  items.forEach((item) => {
    const { url, total, scripting, scriptParseCompile } = item;
    content = content.concat(tBody([url, toFixedTwo(total), toFixedTwo(scripting), toFixedTwo(scriptParseCompile)]));
  });

  return content;
}

function getAuditToTable(audits, tempAudits): string[] {
  let detail = [
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${tempAudits['bootup-time'].title} | ${tempAudits['bootup-time'].displayValue} |`,
    `| ${tempAudits['first-contentful-paint'].title} | ${tempAudits['first-contentful-paint'].displayValue} |`,
    `| ${tempAudits['largest-contentful-paint'].title} | ${tempAudits['largest-contentful-paint'].displayValue} |`,
    `| ${tempAudits['speed-index'].title} | ${tempAudits['speed-index'].displayValue} |`,
    `| ${tempAudits['cumulative-layout-shift'].title} | ${tempAudits['cumulative-layout-shift'].displayValue} |`,
    `| ${tempAudits['first-meaningful-paint'].title} | ${tempAudits['first-meaningful-paint'].displayValue} |`,
    `| ${tempAudits['interactive'].title} | ${tempAudits['interactive'].displayValue} |`,
    `| ${tempAudits['server-response-time'].title} | ${tempAudits['server-response-time'].displayValue} |`,
    `| ${tempAudits['total-blocking-time'].title} | ${tempAudits['total-blocking-time'].displayValue} |`,
    getAppleTouchIcon(audits['apple-touch-icon'], tempAudits['apple-touch-icon']),
    '',
  ];

  detail = detail.concat(getBootupTime(audits['bootup-time'], tempAudits['bootup-time']));

  return detail;
}

export async function generateAuditsMarkdown(path, audits): Promise<string[]> {
  let tempAudits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits, tempAudits);
}
