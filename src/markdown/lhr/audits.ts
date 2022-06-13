import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { convertPercentage, kebabCaseToString, passOrFail, score, toFixedTwo } from '../../libs/utils';
import { bold, BREAK_LINE, h3, h4, image, mlist, summary, tAlignLine, tBody, tHead } from '../markdown';

function getHeadingText(headings, attr: string = 'text'): string[] {
  return headings.map((heading) => heading[attr]);
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

  items?.forEach((item) => {
    const { url, total, scripting, scriptParseCompile } = item;
    content = content.concat(tBody([url, toFixedTwo(total), toFixedTwo(scripting), toFixedTwo(scriptParseCompile)]));
  });

  return content;
}

function getCriticalRequestChains(criticalRequestChains) {
  const { description, details, title, displayValue } = criticalRequestChains;
  const { longestChain } = details;
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

  items?.forEach((item) => {
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

  items?.forEach((item) => {
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

  items?.forEach((item) => {
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

  items?.forEach((item) => {
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

  items?.forEach((item) => {
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
    tBody([toFixedTwo(convertPercentage(iScore)), toFixedTwo(numericValue)]),
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

  items?.forEach((item) => {
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

function getLargestContentfulPaintElement(largestContentfulPaintElement) {
  const { description, title, displayValue, details } = largestContentfulPaintElement;
  const { headings, items } = details;
  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { node } = item;
    content = content.concat(tBody([node?.selector]));
  });

  return content;
}

function getLayoutShiftElements(layoutShiftElements) {
  const { description, title, displayValue, details } = layoutShiftElements;
  const { headings, items } = details;
  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { node, score } = item;
    content = content.concat(tBody([node?.selector, score]));
  });

  return content;
}

function getLcpLazyLoaded(lcpLazyLoaded) {
  const { description, title, details, score: lScore } = lcpLazyLoaded;
  const { headings, items } = details;
  let content = [
    h3(`${score(convertPercentage(lScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { node, score } = item;
    content = content.concat(tBody([node?.selector, score]));
  });

  return content;
}

function getLegacyJavascript(legacyJavascript) {
  const { description, title, details, score: lScore, displayValue } = legacyJavascript;
  const { items, overallSavingsBytes, overallSavingsMs } = details;
  let content = [
    h3(`${score(convertPercentage(lScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overall Savings Bytes', 'overall Savings Ms']),
    tAlignLine(3, 'center'),
    tBody([convertPercentage(lScore), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['url', 'wasted bytes', 'subItems']),
    tAlignLine(3, 'center'),
  ];

  items?.forEach((item) => {
    const { url, wastedBytes, subItems } = item;
    const { items } = subItems;

    content = content.concat(tBody([url, wastedBytes, '-']));
    content = content.concat(items.map(({ signal }) => tBody(['-', '-', signal])));
  });

  return content;
}

function getLongTasks(longTasks) {
  const { description, title, details, displayValue } = longTasks;
  const { headings, items } = details;
  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { url, startTime, duration } = item;
    content = content.concat(tBody([url, toFixedTwo(startTime), toFixedTwo(duration)]));
  });

  return content;
}

function getMainthreadWorkBreakdown(mainthreadWorkBreakdown) {
  const { description, title, details, displayValue, score: mScore, numericValue } = mainthreadWorkBreakdown;
  const { headings, items } = details;
  let content = [
    h3(`${score(convertPercentage(mScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['score', 'Total Time Spent']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(mScore), displayValue]),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { groupLabel, duration } = item;
    content = content.concat(tBody([groupLabel, toFixedTwo(duration)]));
  });

  content = content.concat(tBody(['Total Time Spent', toFixedTwo(numericValue)]));

  return content;
}

function getMaxPotentialFid(maxPotentialFid) {
  const { description, title, score: mScore, numericValue, displayValue } = maxPotentialFid;
  const content = [
    h3(`${score(convertPercentage(mScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['Score', 'MPF']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(mScore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getMetrics(metrics) {
  const { description, title, details } = metrics;
  const { items } = details;
  const metricItems = items[0];
  let metricTable: string[] = [];

  for (const mkey in metricItems) {
    metricTable = metricTable.concat(`| ${mkey} | ${metricItems[mkey]} |`);
  }

  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['Metrics', 'Value']),
    tAlignLine(2),
    ...metricTable,
  ];

  return content;
}

function getModernImageFormats(modernImageFormats) {
  const { description, title, details, score: mScore, displayValue } = modernImageFormats;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(mScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overall Savings Bytes', 'overall Savings Ms']),
    tAlignLine(3, 'center'),
    tBody([convertPercentage(mScore), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['total Bytes', 'wasted Bytes', 'wasted Webp Bytes', 'url']),
    tAlignLine(4, 'center'),
  ];

  items?.forEach((item) => {
    const { url, totalBytes, wastedBytes, wastedWebpBytes } = item;
    content = content.concat(tBody([totalBytes, wastedBytes, wastedWebpBytes, url]));
  });

  return content;
}

function getNetworkRtt(netWorkRtt) {
  const { description, title, details, displayValue } = netWorkRtt;
  const { items, headings } = details;

  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['longest rtt']),
    tAlignLine(1, 'center'),
    tBody([displayValue]),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length),
  ];

  items?.forEach((item) => {
    const { origin, rtt } = item;
    content = content.concat(tBody([origin, rtt]));
  });

  return content;
}

function getNetworkServerLatency(networkServerLatency) {
  const { description, title, details, displayValue } = networkServerLatency;
  const { items, headings } = details;

  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['longest server latency']),
    tAlignLine(1, 'center'),
    tBody([displayValue]),
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length),
  ];

  items?.forEach((item) => {
    const { origin, serverResponseTime } = item;
    const srt = toFixedTwo(serverResponseTime) === 0 ? '1 >=' : toFixedTwo(serverResponseTime);
    content = content.concat(tBody([origin, srt]));
  });

  return content;
}

function getOffscreenImages(offscreenImages) {
  const { description, title, details, displayValue, score: oScore } = offscreenImages;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(oScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'url']),
    tAlignLine(3, 'center'),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, url } = item;
    content = content.concat(tBody([totalBytes, wastedBytes, url]));
  });

  return content;
}

function getPreloadLcpImage(preloadLcpImage) {
  const { description, title, details, displayValue, score: pScore } = preloadLcpImage;
  const { items, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(pScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(pScore), toFixedTwo(overallSavingsMs)]),
    BREAK_LINE,
    tHead(['wastedMs', 'url']),
    tAlignLine(2),
  ];

  items?.forEach((item) => {
    const { wastedMs, url } = item;
    content = content.concat(tBody([toFixedTwo(wastedMs), url]));
  });

  return content;
}

function getRenderBlockingResources(renderBlockingResources) {
  const { description, title, details, displayValue, score: rScore } = renderBlockingResources;
  const { items, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(rScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(rScore), overallSavingsMs]),
    BREAK_LINE,
    tHead(['wastedMs', 'totalBytes', 'url']),
    tAlignLine(3, 'center'),
  ];

  items?.forEach((item) => {
    const { wastedMs, totalBytes, url } = item;
    content = content.concat(tBody([wastedMs, totalBytes, url]));
  });

  return content;
}

function getResourceSummary(resourceSummary) {
  const { description, title, details, displayValue } = resourceSummary;
  const { items, headings } = details;

  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(getHeadingText(headings)),
    tAlignLine(headings.length, 'center'),
  ];

  items?.forEach((item) => {
    const { label, requestCount, transferSize } = item;
    content = content.concat(tBody([label, requestCount, transferSize]));
  });

  return content;
}

function getScriptTreemapData(scriptTreemapData) {
  const { description, title, details, displayValue } = scriptTreemapData;
  const { nodes } = details;

  let content = [
    h3(`${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['resourceBytes', 'unusedBytes', 'name']),
    tAlignLine(3),
  ];

  nodes.forEach((item) => {
    const { resourceBytes, unusedBytes, name } = item;
    content = content.concat(tBody([resourceBytes, unusedBytes === 0 ? '1 >=' : unusedBytes, name]));
  });

  return content;
}

function getServerResponseTime(serverResponseTime) {
  const { description, title, details, displayValue, score: sScore } = serverResponseTime;
  const { overallSavingsMs, items } = details;

  let content = [
    h3(`${score(convertPercentage(sScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(sScore), toFixedTwo(overallSavingsMs)]),
    BREAK_LINE,
    tHead(['responseTime', 'url']),
    tAlignLine(2),
  ];

  items?.forEach((item) => {
    const { responseTime, url } = item;
    content = content.concat(tBody([toFixedTwo(responseTime), url]));
  });

  return content;
}

function getSpeedIndex(speedIndex) {
  const { description, title, displayValue, score: sScore, numericValue } = speedIndex;

  const content = [
    h3(`${score(convertPercentage(sScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'Speed Index']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(sScore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getThirdPartySummary(thirdPartySummary) {
  const { description, title, details, displayValue, score: tScore } = thirdPartySummary;
  const { items, summary: tSummary } = details;
  const { wastedBytes, wastedMs } = tSummary;

  let content = [
    h3(`${score(convertPercentage(tScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'wastedBytes', 'wastedMs']),
    tAlignLine(3, 'center'),
    tBody([convertPercentage(tScore), wastedBytes, wastedMs]),
    BREAK_LINE,
    tHead(['entity', 'transferSize', 'blockingTime', 'mainThreadTime']),
    tAlignLine(4),
  ];

  items?.forEach((item) => {
    const { entity, transferSize, blockingTime, mainThreadTime } = item;
    content = content.concat(tBody([entity.text, transferSize, blockingTime, toFixedTwo(mainThreadTime)]));
  });

  return content;
}

function getTotalBlockingTime(totalBlockingTime) {
  const { description, title, displayValue, score: tScore, numericValue } = totalBlockingTime;

  const content = [
    h3(`${score(convertPercentage(tScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'Total Blocking Time']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(tScore), toFixedTwo(numericValue)]),
  ];

  return content;
}

function getTotalByteWeight(totalByteWeight) {
  const { description, title, details, displayValue, score: tScore, numericValue } = totalByteWeight;
  const { items, headings } = details;

  let content = [
    h3(`${score(convertPercentage(tScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'Total Byte Weight']),
    tAlignLine(2, 'center'),
    tBody([convertPercentage(tScore), numericValue]),
    BREAK_LINE,
    tHead(getHeadingText(headings).reverse()),
    tAlignLine(headings.length),
  ];

  items?.forEach((item) => {
    const { url, totalBytes } = item;
    content = content.concat(tBody([totalBytes, url]));
  });

  return content;
}

function getUnminifiedCss(unminifiedCss) {
  const { description, title, details, displayValue, score: uScore, numericValue } = unminifiedCss;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([convertPercentage(uScore), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'wastedPercent', 'url']),
    tAlignLine(4),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, wastedPercent, url } = item;
    content = content.concat(tBody([totalBytes, wastedBytes, wastedPercent, url]));
  });

  return content;
}

function getUnminifiedJavascript(unminifiedJavascript) {
  const { description, title, details, displayValue, score: uScore, numericValue } = unminifiedJavascript;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([convertPercentage(uScore), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'wastedPercent', 'url']),
    tAlignLine(4),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, wastedPercent, url } = item;
    content = content.concat(tBody([totalBytes, wastedBytes, wastedPercent, url]));
  });

  return content;
}

function getUnsizedImages(unsizedImages) {
  const { description, title, details, score: uScore } = unsizedImages;
  const { items } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    tHead(['selector', 'url']),
    tAlignLine(2),
  ];

  items?.forEach((item) => {
    const { node, url } = item;
    const { selector } = node;
    content = content.concat(tBody([selector, url]));
  });

  return content;
}

function getUnusedCssRules(unusedCssRules) {
  const { description, title, details, score: uScore, displayValue } = unusedCssRules;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'url']),
    tAlignLine(3),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, url } = item;
    content = content.concat(tBody([totalBytes, wastedBytes, url]));
  });

  return content;
}

function getUnusedJavascript(unusedJavascript) {
  const { description, title, details, score: uScore, displayValue } = unusedJavascript;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), overallSavingsBytes, overallSavingsMs]),
    BREAK_LINE,
    tHead(['wastedPercent', 'totalBytes', 'wastedBytes', 'url']),
    tAlignLine(4, 'center'),
  ];

  items?.forEach((item) => {
    const { wastedPercent, totalBytes, wastedBytes, url } = item;
    content = content.concat(tBody([`${toFixedTwo(wastedPercent)} %`, totalBytes, wastedBytes, url]));
  });

  return content;
}

function getUsesHttp2(usesHttp2) {
  const { description, title, details, score: uScore, displayValue } = usesHttp2;
  const { items, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), overallSavingsMs]),
    BREAK_LINE,
    tHead(['protocol', 'url']),
    tAlignLine(2),
  ];

  items?.forEach((item) => {
    const { protocol, url } = item;
    content = content.concat(tBody([protocol, url]));
  });

  return content;
}

function getUsesLongCacheTtl(usesLongCacheTtl) {
  const { description, title, details, score: uScore, displayValue } = usesLongCacheTtl;
  const { items, summary: uSummary } = details;
  const { wastedBytes } = uSummary;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'wastedBytes']),
    tAlignLine(2, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), toFixedTwo(wastedBytes)]),
    BREAK_LINE,
    tHead(['cacheHitProbability', 'cacheLifetimeMs', 'totalBytes', 'wastedBytes', 'url']),
    tAlignLine(5),
  ];

  items?.forEach((item) => {
    const { cacheHitProbability, cacheLifetimeMs, totalBytes, wastedBytes, url } = item;
    content = content.concat(
      tBody([toFixedTwo(cacheHitProbability), cacheLifetimeMs, totalBytes, toFixedTwo(wastedBytes), url]),
    );
  });

  return content;
}

function getUsesOptimizedImages(usesOptimizedImages) {
  const { description, title, details, score: uScore, displayValue } = usesOptimizedImages;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), toFixedTwo(overallSavingsBytes), overallSavingsMs]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'url']),
    tAlignLine(3),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, url } = item;
    content = content.concat(tBody([toFixedTwo(totalBytes), toFixedTwo(wastedBytes), url]));
  });

  return content;
}

function getusesRelPreconnect(usesRelPreconnect) {
  const { description, title, details, score: uScore, displayValue } = usesRelPreconnect;
  const { items, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsMs']),
    tAlignLine(2, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), toFixedTwo(overallSavingsMs)]),
    BREAK_LINE,
    tHead(['wastedMs', 'url']),
    tAlignLine(3),
  ];

  items?.forEach((item) => {
    const { wastedMs, url } = item;
    content = content.concat(tBody([toFixedTwo(wastedMs), url]));
  });

  return content;
}

function getUsesResponsiveImages(usesResponsiveImages) {
  const { description, title, details, score: uScore, displayValue } = usesResponsiveImages;
  const { items, overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), toFixedTwo(overallSavingsBytes), toFixedTwo(overallSavingsMs)]),
    BREAK_LINE,
    tHead(['totalBytes', 'wastedBytes', 'url']),
    tAlignLine(3),
  ];

  items?.forEach((item) => {
    const { totalBytes, wastedBytes, url } = item;
    content = content.concat(tBody([toFixedTwo(totalBytes), toFixedTwo(wastedBytes), url]));
  });

  return content;
}

function getUsesTextCompression(usesTextCompression) {
  const { description, title, details, score: uScore, displayValue } = usesTextCompression;
  const { overallSavingsBytes, overallSavingsMs } = details;

  let content = [
    h3(`${score(convertPercentage(uScore))} ${title}`),
    BREAK_LINE,
    summary('description', description),
    BREAK_LINE,
    displayValue,
    BREAK_LINE,
    tHead(['score', 'overallSavingsBytes', 'overallSavingsMs']),
    tAlignLine(3, 'center'),
    tBody([toFixedTwo(convertPercentage(uScore)), toFixedTwo(overallSavingsBytes), toFixedTwo(overallSavingsMs)]),
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
    'link-name',
  ];
  const javascriptList = [
    'duplicated-javascript',
    'errors-in-console',
    'geolocation-on-start',
    'js-libraries',
    'no-unload-listeners',
    'no-vulnerable-libraries',
    'notification-on-start',
    'object-alt',
    'performance-budget',
  ];
  const networkList = [
    'efficient-animated-content',
    'http-status-code',
    'inspector-issues',
    'redirects',
    'render-blocking-resources',
    'server-response-time',
    'timing-budget',
    'total-blocking-time',
    'total-byte-weight',
    'uses-http2',
    'uses-long-cache-ttl',
    'uses-optimized-images',
    'uses-rel-preconnect',
    'uses-rel-preload',
    'uses-text-compression',
  ];
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
    'link-text',
    'list',
    'listitem',
    'logical-tab-order',
    'managed-focus',
    'maskable-icon',
    'meta-description',
    'meta-refresh',
    'meta-viewport',
    'no-document-write',
    'password-inputs-can-be-pasted-into',
    'plugins',
    'preload-fonts',
    'robots-txt',
    'splash-screen',
    'structured-data',
    'tabindex',
    'td-headers-attr',
    'th-has-data-cells',
    'themed-omnibox',
    'third-party-facades',
    'third-party-summary',
    'unsized-images',
    'use-landmarks',
    'uses-responsive-images',
    'valid-lang',
    'valid-source-maps',
    'video-caption',
    'viewport',
    'visual-order-follows-dom',
  ];
  const styleList = [
    'color-contrast',
    'content-width',
    'image-aspect-ratio',
    'image-size-responsive',
    'non-composited-animations',
    'offscreen-content-hidden',
    'tap-targets',
    'unused-css-rules',
  ];
  const pwa = ['pwa-cross-browser', 'pwa-each-page-has-url', 'pwa-page-transitions', 'service-worker'];
  const etc = [
    'screenshot-thumbnails',
    'unminified-css',
    'unminified-javascript',
    'user-timings',
    'uses-passive-event-listeners',
  ];

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
    `| ${bold('PWA')} | |`,
    ...getArrayToTable(audits, pwa),
    `| ${bold('ETC')} | |`,
    ...getArrayToTable(audits, etc),
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
    BREAK_LINE,
    getLargestContentfulPaintElement(tempAudits['largest-contentful-paint-element']),
    BREAK_LINE,
    getLayoutShiftElements(tempAudits['layout-shift-elements']),
    BREAK_LINE,
    getLcpLazyLoaded(tempAudits['lcp-lazy-loaded']),
    BREAK_LINE,
    getLegacyJavascript(tempAudits['legacy-javascript']),
    BREAK_LINE,
    getLongTasks(tempAudits['long-tasks']),
    BREAK_LINE,
    getMainthreadWorkBreakdown(tempAudits['mainthread-work-breakdown']),
    BREAK_LINE,
    getMaxPotentialFid(tempAudits['max-potential-fid']),
    BREAK_LINE,
    getMetrics(tempAudits['metrics']),
    BREAK_LINE,
    getModernImageFormats(tempAudits['modern-image-formats']),
    BREAK_LINE,
    getNetworkRtt(tempAudits['network-rtt']),
    BREAK_LINE,
    getNetworkServerLatency(tempAudits['network-server-latency']),
    BREAK_LINE,
    getOffscreenImages(tempAudits['offscreen-images']),
    BREAK_LINE,
    getPreloadLcpImage(tempAudits['preload-lcp-image']),
    BREAK_LINE,
    getRenderBlockingResources(tempAudits['render-blocking-resources']),
    BREAK_LINE,
    getResourceSummary(tempAudits['resource-summary']),
    BREAK_LINE,
    getScriptTreemapData(tempAudits['script-treemap-data']),
    BREAK_LINE,
    getServerResponseTime(tempAudits['server-response-time']),
    BREAK_LINE,
    getSpeedIndex(tempAudits['speed-index']),
    BREAK_LINE,
    getThirdPartySummary(tempAudits['third-party-summary']),
    BREAK_LINE,
    getTotalBlockingTime(tempAudits['total-blocking-time']),
    BREAK_LINE,
    getTotalByteWeight(tempAudits['total-byte-weight']),
    BREAK_LINE,
    getUnminifiedCss(tempAudits['unminified-css']),
    BREAK_LINE,
    getUnminifiedJavascript(tempAudits['unminified-javascript']),
    BREAK_LINE,
    getUnsizedImages(tempAudits['unsized-images']),
    BREAK_LINE,
    getUnusedCssRules(tempAudits['unused-css-rules']),
    BREAK_LINE,
    getUnusedJavascript(tempAudits['unused-javascript']),
    BREAK_LINE,
    getUsesHttp2(tempAudits['uses-http2']),
    BREAK_LINE,
    getUsesLongCacheTtl(tempAudits['uses-long-cache-ttl']),
    BREAK_LINE,
    getUsesOptimizedImages(tempAudits['uses-optimized-images']),
    BREAK_LINE,
    getusesRelPreconnect(tempAudits['uses-rel-preconnect']),
    BREAK_LINE,
    getUsesResponsiveImages(tempAudits['uses-responsive-images']),
    BREAK_LINE,
    getUsesTextCompression(tempAudits['uses-text-compression']),
  );
  return content;
}

export async function generateAuditsMarkdown(path, audits): Promise<string[]> {
  let tempAudits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audits.json`, 'utf8'));

  return getAuditToTable(audits, tempAudits);
}
