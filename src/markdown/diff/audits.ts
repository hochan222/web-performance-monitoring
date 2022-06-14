import { score } from '../../libs/utils';
import { BREAK_LINE, h3, tAlignLine, tBody, tHead } from '../markdown';

function getCRUXMetrics(
  company,
  cumulativeLayoutShift,
  firstContentfulPaint,
  firstMeaningfulPaint,
  largestContentfulPaint,
) {
  const cumulativeLayoutShiftText = cumulativeLayoutShift?.map(
    ({ displayValue, score: cScore }) => `${score(cScore)} ${displayValue}`,
  );
  const firstContentfulPaintText = firstContentfulPaint?.map(
    ({ numericValue, score: fScore }) => `${score(fScore)} ${numericValue}`,
  );
  const firstMeaningfulPaintText = firstMeaningfulPaint?.map(
    ({ numericValue, score: fScore }) => `${score(fScore)} ${numericValue}`,
  );
  const largestContentfulPaintText = largestContentfulPaint?.map(
    ({ numericValue, score: lScore }) => `${score(lScore)} ${numericValue}`,
  );
  const content = [
    h3('CRUX Metrics'),
    tHead(company),
    tAlignLine(company.length),
    tBody(['CLS', ...cumulativeLayoutShiftText]),
    tBody(['FCP', ...firstContentfulPaintText]),
    tBody(['FMP', ...firstMeaningfulPaintText]),
    tBody(['LCP', ...largestContentfulPaintText]),
  ];

  return content;
}

function getBasicMetrics(company, interactive, maxPotentialFid) {
  const interactiveText = interactive?.map(({ numericValue, score: iScore }) => `${score(iScore)} ${numericValue}`);
  const maxPotentialFidText = maxPotentialFid?.map(
    ({ numericValue, score: mScore }) => `${score(mScore)} ${numericValue}`,
  );
  const content = [
    h3('Basic Metrics'),
    tHead(company),
    tAlignLine(company.length),
    tBody(['Interactive', ...interactiveText]),
    tBody(['Max Potential Fid', ...maxPotentialFidText]),
  ];

  return content;
}

function getLoadMetrics(company, bootupTime, criticalRequestChains, mainthreadWorkBreakdown) {
  const bootupTimeText = bootupTime?.map(({ numericValue, score: bScore }) => `${score(bScore)} ${numericValue}`);
  const mainthreadWorkBreakdownText = mainthreadWorkBreakdown?.map(
    ({ numericValue, score: mScore }) => `${score(mScore)} ${numericValue}`,
  );
  const content = [
    h3('Load Metrics'),
    tHead(company),
    tAlignLine(company.length),
    tBody(['Boot Up Time', ...bootupTimeText]),
    tBody(['Critical Request Chains', ...criticalRequestChains]),
    tBody(['Main Thread Work Breakdown', ...mainthreadWorkBreakdownText]),
  ];

  return content;
}

function getNetworkMetrics(
  company,
  numRequests,
  numScripts,
  numStylesheets,
  numFonts,
  numTasks,
  numTasksOver10ms,
  numTasksOver25ms,
  numTasksOver50ms,
  numTasksOver100ms,
  numTasksOver500ms,
  rtt,
  throughput,
  maxRtt,
  maxServerLatency,
  totalByteWeight,
  totalTaskTime,
  mainDocumentTransferSize,
) {
  const content = [
    h3('Network Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Requests', ...numRequests]),
    tBody(['Scripts', ...numScripts]),
    tBody(['StyleSheets', ...numStylesheets]),
    tBody(['Fonts', ...numFonts]),
    tBody(['Tasks', ...numTasks]),
    tBody(['Tasks Over 10ms', ...numTasksOver10ms]),
    tBody(['Tasks Over 25ms', ...numTasksOver25ms]),
    tBody(['Tasks Over 50ms', ...numTasksOver50ms]),
    tBody(['Tasks Over 100ms', ...numTasksOver100ms]),
    tBody(['Tasks Over 500ms', ...numTasksOver500ms]),
    tBody(['RTT', ...rtt]),
    tBody(['Throuhput', ...throughput]),
    tBody(['Max Rtt', ...maxRtt]),
    tBody(['Max Server Latency', ...maxServerLatency]),
    tBody(['Total Byte Weight', ...totalByteWeight]),
    tBody(['Total Task Time', ...totalTaskTime]),
    tBody(['Main Document TransferSize', ...mainDocumentTransferSize]),
  ];

  return content;
}

function getDomMetrics(company, totalDomElements, maximumDomDepth, maximumChildElements) {
  const content = [
    h3('Dom Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Total Dom Elements', ...totalDomElements]),
    tBody(['Maximum Dom Depth', ...maximumDomDepth]),
    tBody(['Maximum ChildElements', ...maximumChildElements]),
  ];

  return content;
}

function getEtcs(company, finalScreenshot, legacyJavascript) {
  const legacyJavascriptBytesText = legacyJavascript?.map(
    ({ score: lScore, overallSavingsBytes }) => `${score(lScore)} ${overallSavingsBytes}`,
  );
  const legacyJavascriptMsText = legacyJavascript?.map(
    ({ score: lScore, overallSavingsMs }) => `${score(lScore)} ${overallSavingsMs}`,
  );
  const content = [
    h3('ETC Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Final Screenshot Time', ...finalScreenshot]),
    tBody(['Legacy Javascript Overall Savings Bytes', ...legacyJavascriptBytesText]),
    tBody(['Legacy Javascript Overall Savings ms', ...legacyJavascriptMsText]),
  ];

  return content;
}

export async function generateAuditsDiff(persistentData) {
  const company = [''];
  const bootupTime: {
    numericValue: number;
    score: number;
  }[] = [];
  const criticalRequestChains: string[] = [];
  const cumulativeLayoutShift: {
    displayValue?: string;
    score?: number;
  }[] = [];
  const numRequests: number[] = [];
  const numScripts: number[] = [];
  const numStylesheets: number[] = [];
  const numFonts: number[] = [];
  const numTasks: number[] = [];
  const numTasksOver10ms: number[] = [];
  const numTasksOver25ms: number[] = [];
  const numTasksOver50ms: number[] = [];
  const numTasksOver100ms: number[] = [];
  const numTasksOver500ms: number[] = [];
  const rtt: number[] = [];
  const throughput: number[] = [];
  const maxRtt: number[] = [];
  const maxServerLatency: number[] = [];
  const totalByteWeight: number[] = [];
  const totalTaskTime: number[] = [];
  const mainDocumentTransferSize: number[] = [];
  const totalDomElements: string[] = [];
  const maximumDomDepth: number[] = [];
  const maximumChildElements: number[] = [];
  const finalScreenshot: number[] = [];
  const firstContentfulPaint: {
    numerticValue: number;
    score: number;
  }[] = [];
  const firstMeaningfulPaint: {
    numerticValue: number;
    score: number;
  }[] = [];
  //   const fontDisplay = []
  const interactive: {
    numerticValue: number;
    score: number;
  }[] = [];
  const largestContentfulPaint: {
    numerticValue: number;
    score: number;
  }[] = [];
  const legacyJavascript: {
    overallSavingsBytes: number;
    overallSavingsMs: number;
    score: number;
  }[] = [];
  const mainthreadWorkBreakdown: {
    numerticValue: number;
    score: number;
  }[] = [];
  const maxPotentialFid: {
    numerticValue: number;
    score: number;
  }[] = [];

  persistentData.forEach(({ company: cp, data }) => {
    const { audits } = data;
    company.push(cp);
    bootupTime.push(audits['bootup-time']);
    criticalRequestChains.push(audits['critical-request-chains']?.displayValue);
    cumulativeLayoutShift.push(audits['cumulative-layout-shift']);
    numRequests.push(audits['diagnostics']?.numRequests);
    numScripts.push(audits['diagnostics']?.numScripts);
    numStylesheets.push(audits['diagnostics']?.numStylesheets);
    numFonts.push(audits['diagnostics']?.numFonts);
    numTasks.push(audits['diagnostics']?.numTasks);
    numTasksOver10ms.push(audits['diagnostics']?.numTasksOver10ms);
    numTasksOver25ms.push(audits['diagnostics']?.numTasksOver25ms);
    numTasksOver50ms.push(audits['diagnostics']?.numTasksOver50ms);
    numTasksOver100ms.push(audits['diagnostics']?.numTasksOver100ms);
    numTasksOver500ms.push(audits['diagnostics']?.numTasksOver500ms);
    rtt.push(audits['diagnostics']?.rtt);
    throughput.push(audits['diagnostics']?.throughput);
    maxRtt.push(audits['diagnostics']?.maxRtt);
    maxServerLatency.push(audits['diagnostics']?.maxServerLatency);
    totalByteWeight.push(audits['diagnostics']?.totalByteWeight);
    totalTaskTime.push(audits['diagnostics']?.totalTaskTime);
    mainDocumentTransferSize.push(audits['diagnostics']?.mainDocumentTransferSize);
    totalDomElements.push(`${score(audits['dom-size']?.score)} ${audits['dom-size']?.totalDomElements}`);
    maximumDomDepth.push(audits['dom-size']?.maximumDomDepth);
    maximumChildElements.push(audits['dom-size']?.maximumChildElements);
    finalScreenshot.push(audits['final-screenshot']?.timing);
    firstContentfulPaint.push(audits['first-contentful-paint']);
    firstMeaningfulPaint.push(audits['first-meaningful-paint']);
    interactive.push(audits['interactive']);
    largestContentfulPaint.push(audits['largest-contentful-paint']);
    legacyJavascript.push(audits['legacy-javascript']);
    mainthreadWorkBreakdown.push(audits['mainthread-work-breakdown']);
    maxPotentialFid.push(audits['max-potential-fid']);
  });

  return [
    ...getCRUXMetrics(
      company,
      cumulativeLayoutShift,
      firstContentfulPaint,
      firstMeaningfulPaint,
      largestContentfulPaint,
    ),
    BREAK_LINE,
    ...getBasicMetrics(company, interactive, maxPotentialFid),
    BREAK_LINE,
    ...getLoadMetrics(company, bootupTime, criticalRequestChains, mainthreadWorkBreakdown),
    BREAK_LINE,
    ...getNetworkMetrics(
      company,
      numRequests,
      numScripts,
      numStylesheets,
      numFonts,
      numTasks,
      numTasksOver10ms,
      numTasksOver25ms,
      numTasksOver50ms,
      numTasksOver100ms,
      numTasksOver500ms,
      rtt,
      throughput,
      maxRtt,
      maxServerLatency,
      totalByteWeight,
      totalTaskTime,
      mainDocumentTransferSize,
    ),
    BREAK_LINE,
    ...getDomMetrics(company, totalDomElements, maximumDomDepth, maximumChildElements),
    BREAK_LINE,
    ...getEtcs(company, finalScreenshot, legacyJavascript),
  ];
}
