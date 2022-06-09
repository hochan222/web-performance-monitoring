import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { kebabCaseToString, passOrFail, score, toFixedTwo } from '../../libs/utils';
import { bold, BREAK_LINE, h3, h4, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

function getHeadingText(headings) {
  return headings.map((heading) => heading.text);
}

// ===== Audits Start =====

function getBootupTime(bootupTime): string[] {
  const { title, details, numericUnit, description, numericValue } = bootupTime;
  const { headings, items } = details;
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    ...mlist('Unit', [numericUnit]),
    ...mlist('wastedMs', [toFixedTwo(numericValue)]),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length),
  ];

  items.forEach((item) => {
    const { url, total, scripting, scriptParseCompile } = item;
    content = content.concat(tBody([url, toFixedTwo(total), toFixedTwo(scripting), toFixedTwo(scriptParseCompile)]));
  });

  return content;
}

function getCriticalRequestChains(criticalRequestChains) {
  const { description, details, title, displayValue } = criticalRequestChains;
  const { chains, longestChain } = details;
  const { duration, length, transferSize } = longestChain;
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    tHead(['', 'duration', 'length', 'transferSize']),
    tAlignLine(longestChain.length + 1, 'center'),
    tBody(['longestChain', toFixedTwo(duration), length, transferSize]),
  ];
  return content;
}

function getCspXss(cspXss) {
  const { description, details, title } = cspXss;
  const { headings, items } = details;
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items.forEach((item) => {
    const { description, directive, severity } = item;
    content = content.concat(tBody([description, directive, severity]));
  });

  return content;
}

function getCumulativeLayoutShift(cumulativeLayoutShift) {
  const { description, details, title, score: cScore } = cumulativeLayoutShift;
  const { items } = details;
  let content = [
    h3(`${score(cScore)} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['cumulativeLayoutShiftMainFrame', 'totalCumulativeLayoutShift']),
    tAlignLine(2, 'center'),
  ];

  items.forEach((item) => {
    const { cumulativeLayoutShiftMainFrame, totalCumulativeLayoutShift } = item;
    content = content.concat(tBody([cumulativeLayoutShiftMainFrame, totalCumulativeLayoutShift]));
  });

  return content;
}

function getDiagnostics(diagnostics) {
  const { description, details, title } = diagnostics;
  const { items } = details;
  const HEAD_LIST = [
    'mainDocumentTransferSize',
    'maxRtt',
    'maxServerLatency',
    'numFonts',
    'numRequests',
    'numScripts',
    'numStylesheets',
    'numTasks',
    'numTasksOver10ms',
    'numTasksOver25ms',
    'numTasksOver50ms',
    'numTasksOver100ms',
    'numTasksOver500ms',
    'rtt',
    'throughput',
    'totalByteWeight',
    'totalTaskTime',
  ];
  let content = [
    h3(title),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(HEAD_LIST),
    tAlignLine(HEAD_LIST.length, 'center'),
  ];

  items.forEach((item) => {
    const {
      mainDocumentTransferSize,
      maxRtt,
      maxServerLatency,
      numFonts,
      numRequests,
      numScripts,
      numStylesheets,
      numTasks,
      numTasksOver10ms,
      numTasksOver25ms,
      numTasksOver50ms,
      numTasksOver100ms,
      numTasksOver500ms,
      rtt,
      throughput,
      totalByteWeight,
      totalTaskTime,
    } = item;
    content = content.concat(
      tBody([
        mainDocumentTransferSize,
        toFixedTwo(maxRtt),
        toFixedTwo(maxServerLatency),
        numFonts,
        numRequests,
        numScripts,
        numStylesheets,
        numTasks,
        numTasksOver10ms,
        numTasksOver25ms,
        numTasksOver50ms,
        numTasksOver100ms,
        numTasksOver500ms,
        toFixedTwo(rtt),
        toFixedTwo(throughput),
        totalByteWeight,
        toFixedTwo(totalTaskTime),
      ]),
    );
  });

  return content;
}

function getDomSize(domSize) {
  const { description, title, details, score: dScore } = domSize;
  const { headings, items } = details;
  let content = [
    h3(`${score(dScore)} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items.forEach((item) => {
    const { statistic, node, value } = item;
    content = content.concat(tBody([statistic, node?.selector, value]));
  });

  return content;
}

// ===== Audits End =====

function getArrayToTable(audits, arr): string[] {
  return arr.map((aria) => tBody([audits[aria].id, passOrFail(audits[aria].score)], audits[aria].id));
}

function getSummaryAuditToTable(audits) {
  const ariaList = [
    'aria-allowed-attr',
    'aria-hidden-body',
    'aria-hidden-focus',
    'aria-required-attr',
    'aria-roles',
    'aria-valid-attr',
    'aria-valid-attr-value',
    'button-name',
    'bypass',
    'custom-controls-labels',
    'custom-controls-roles',
  ];
  const htmlList = [
    'charset',
    'crawlable-anchors',
    'definition-list',
    'deprecations',
    'dlitem',
    'doctype',
    'document-title',
  ];
  const styleList = ['color-contrast', 'content-width'];

  let content = [
    `| Category | Score |`,
    `| --- | --- |`,
    `| ${bold('Basic Metrics')} | |`,
    `| ${audits['bootup-time'].title} | ${audits['bootup-time'].displayValue} |`,
    `| ${audits['first-contentful-paint'].title} | ${audits['first-contentful-paint'].displayValue} |`,
    `| ${audits['largest-contentful-paint'].title} | ${audits['largest-contentful-paint'].displayValue} |`,
    `| ${audits['speed-index'].title} | ${audits['speed-index'].displayValue} |`,
    `| ${audits['cumulative-layout-shift'].title} | ${audits['cumulative-layout-shift'].displayValue} |`,
    `| ${audits['first-meaningful-paint'].title} | ${audits['first-meaningful-paint'].displayValue} |`,
    `| ${audits['interactive'].title} | ${audits['interactive'].displayValue} |`,
    `| ${audits['server-response-time'].title} | ${audits['server-response-time'].displayValue} |`,
    `| ${audits['total-blocking-time'].title} | ${audits['total-blocking-time'].displayValue} |`,
    tBody([kebabCaseToString(audits['apple-touch-icon'].id), passOrFail(audits['apple-touch-icon'].score)]),
    `| ${bold('Aria')} | |`,
    ...getArrayToTable(audits, ariaList),
    `| ${bold('HTML')} | |`,
    ...getArrayToTable(audits, htmlList),
    `| ${bold('Style')} | |`,
    ...getArrayToTable(audits, styleList),
    '',
  ];

  return content;
}

function getAuditToTable(audits, tempAudits): string[] {
  let content = getSummaryAuditToTable(tempAudits);

  content = content.concat(
    getBootupTime(tempAudits['bootup-time']),
    BREAK_LINE,
    getCriticalRequestChains(tempAudits['critical-request-chains']),
    BREAK_LINE,
    getCspXss(tempAudits['csp-xss']),
    BREAK_LINE,
    getCumulativeLayoutShift(tempAudits['cumulative-layout-shift']),
    BREAK_LINE,
    getDiagnostics(tempAudits['diagnostics']),
    BREAK_LINE,
    getDomSize(tempAudits['dom-size']),
  );
  return content;
}

export async function generateAuditsMarkdown(path, audits): Promise<string[]> {
  let tempAudits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits, tempAudits);
}
