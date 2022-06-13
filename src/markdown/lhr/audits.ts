import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { convertPercentage, kebabCaseToString, passOrFail, score, toFixedTwo } from '../../libs/utils';
import { bold, BREAK_LINE, h3, h4, image, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

function getHeadingText(headings): string[] {
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
    h3(`${score(convertPercentage(cScore))} ${title}`),
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
    h3(`${score(convertPercentage(dScore))} ${title}`),
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

function getFinalScreenshot(finalScreenshot) {
  const { description, title, details } = finalScreenshot;
  const { timing, data } = details;
  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    `timing: ${timing}`,
    BREAK_LINE,
    summary('image', image(data, title)),
  ];

  return content;
}

function getFirstContentfulPaint(firstContentfulPaint) {
  const { description, title, score: fscore, numericValue, displayValue } = firstContentfulPaint;
  const content = [
    h3(`${score(convertPercentage(fscore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['Score', 'FCP']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(fscore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getFirstMeaningfulPaint(firstMeaningfulPaint) {
  const { description, title, score: fscore, numericValue, displayValue } = firstMeaningfulPaint;
  const content = [
    h3(`${score(convertPercentage(fscore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['Score', 'FMP']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(fscore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getFontDisplay(fontDisplay) {
  const { description, title, score: fscore, details } = fontDisplay;
  const { items, headings } = details;
  let content = [
    h3(`${score(convertPercentage(fscore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length),
  ];

  items.forEach((item) => {
    const { url, wastedMs } = item;
    content = content.concat(tBody([url, toFixedTwo(wastedMs)]));
  });

  return content;
}

function getFontSize(fontSize) {
  const { description, title, score: fscore, displayValue } = fontSize;
  let content = [
    h3(`${score(convertPercentage(fscore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
  ];

  return content;
}

function getFullPageScreenshot(fullPageScreenshot) {
  const { description, title, details } = fullPageScreenshot;
  const { screenshot } = details;
  const { data, height, width } = screenshot;
  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['height', 'width']),
    tAlignLine(2),
    tBody([height, width]),
    BREAK_LINE,
    summary('image', image(data, title)),
  ];

  return content;
}

function getInteractive(interactive) {
  const { description, title, numericValue, score: iScore, displayValue } = interactive;
  const content = [
    h3(`${score(convertPercentage(iScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['Score', 'FCP']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(iScore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getIsOnHttps(isOnHttp) {
  const { description, title, details, displayValue, score: iScore } = isOnHttp;
  const { items, headings } = details;
  let content = [
    h3(`${score(convertPercentage(iScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(getHeadingText(headings).reverse()),
    tAlignLine(headings.length),
  ];

  items.forEach((item) => {
    const { url, resolution } = item;
    content = content.concat(tBody([resolution, url]));
  });

  return content;
}

function getLargestContentfulPaint(largestContentfulPaint) {
  const { description, title, score: fscore, numericValue, displayValue } = largestContentfulPaint;
  const content = [
    h3(`${score(convertPercentage(fscore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['Score', 'LCP']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(fscore), toFixedTwo(numericValue)]),
  ];

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
    'focus-traps',
    'focusable-controls',
    'interactive-element-affordance',
  ];
  const javascriptList = ['duplicated-javascript', 'errors-in-console', 'geolocation-on-start', 'js-libraries'];
  const networkList = ['efficient-animated-content', 'http-status-code', 'inspector-issues'];
  const htmlList = [
    'charset',
    'crawlable-anchors',
    'definition-list',
    'deprecations',
    'dlitem',
    'doctype',
    'document-title',
    'duplicate-id-active',
    'duplicate-id-aria',
    'form-field-multiple-labels',
    'frame-title',
    'heading-order',
    'hreflang',
    'html-has-lang',
    'html-lang-valid',
    'image-alt',
    'input-image-alt',
    'installable-manifest',
    'is-crawlable',
    'label',
  ];
  const styleList = ['color-contrast', 'content-width', 'image-aspect-ratio', 'image-size-responsive'];

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
    `| ${bold('Javascript')} | |`,
    ...getArrayToTable(audits, javascriptList),
    `| ${bold('Network')} | |`,
    ...getArrayToTable(audits, networkList),
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
    BREAK_LINE,
    getFinalScreenshot(tempAudits['final-screenshot']),
    BREAK_LINE,
    getFirstContentfulPaint(tempAudits['first-contentful-paint']),
    BREAK_LINE,
    getFirstMeaningfulPaint(tempAudits['first-meaningful-paint']),
    BREAK_LINE,
    getFontDisplay(tempAudits['font-display']),
    BREAK_LINE,
    getFontSize(tempAudits['font-size']),
    BREAK_LINE,
    getFullPageScreenshot(tempAudits['full-page-screenshot']),
    BREAK_LINE,
    getInteractive(tempAudits['interactive']),
    BREAK_LINE,
    getIsOnHttps(tempAudits['is-on-https']),
    BREAK_LINE,
    getLargestContentfulPaint(tempAudits['largest-contentful-paint']),
  );
  return content;
}

export async function generateAuditsMarkdown(path, audits): Promise<string[]> {
  let tempAudits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits, tempAudits);
}
