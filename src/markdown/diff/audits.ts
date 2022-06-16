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

function getBasicMetrics(company, interactive, maxPotentialFid, speedIndex) {
  const interactiveText = interactive?.map(({ numericValue, score: iScore }) => `${score(iScore)} ${numericValue}`);
  const maxPotentialFidText = maxPotentialFid?.map(
    ({ numericValue, score: mScore }) => `${score(mScore)} ${numericValue}`,
  );
  const speedIndexText = speedIndex?.map(({ score: sScore, numericValue }) => `${score(sScore)} ${numericValue}`);
  const content = [
    h3('Basic Metrics'),
    tHead(company),
    tAlignLine(company.length),
    tBody(['Interactive', ...interactiveText]),
    tBody(['Max Potential Fid', ...maxPotentialFidText]),
    tBody(['Speed Index', ...speedIndexText]),
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
  serverResponseTime,
  totalBlockingTime,
  usesLongCacheTtl,
  usesRelPreconnect,
) {
  const totalByteWeightText = totalByteWeight?.map(
    ({ score: tScore, totalByteWeight }) => `${score(tScore)} ${totalByteWeight}`,
  );
  const serverResponseTimeText = serverResponseTime?.map(
    ({ score: sScore, overallSavingsMs }) => `${score(sScore)} ${overallSavingsMs}`,
  );
  const totalBlockingTimeText = totalBlockingTime?.map(
    ({ score: tScore, numericValue }) => `${score(tScore)} ${numericValue}`,
  );
  const usesLongCacheTtlText = usesLongCacheTtl?.map(
    ({ score: uScore, wastedBytes }) => `${score(uScore)} ${wastedBytes}`,
  );
  const usesRelPreconnectMsText = usesRelPreconnect?.map(
    ({ score: sScore, overallSavingsMs }) => `${score(sScore)} ${overallSavingsMs}`,
  );
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
    tBody(['Total Byte Weight', ...totalByteWeightText]),
    tBody(['Total Task Time', ...totalTaskTime]),
    tBody(['Main Document TransferSize', ...mainDocumentTransferSize]),
    tBody(['Server Response Time Saving Ms', ...serverResponseTimeText]),
    tBody(['Total Blocking Time', ...totalBlockingTimeText]),
    tBody(['Uses Long Cache TTL', ...usesLongCacheTtlText]),
    tBody(['Uses Rel Preconnect', ...usesRelPreconnectMsText]),
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

function getSizeMetrics(
  company,
  resourceSummaryItems,
  unminifiedCss,
  unminifiedJavascript,
  unusedCssRules,
  unusedJavascript,
  usesTextCompression,
) {
  const totalSize: number[] = [];
  const fontSize: number[] = [];
  const imageSize: number[] = [];
  const mediaSize: number[] = [];
  const scriptSize: number[] = [];
  const stylesheetSize: number[] = [];
  const documentSize: number[] = [];
  const otherSize: number[] = [];
  const thirdPartySize: number[] = [];
  const unminifiedCssSavingBytesText = unminifiedCss?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const unminifiedCssSavingMsText = unminifiedCss?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const unminifiedJsSavingBytesText = unminifiedJavascript?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const unminifiedJsSavingMsText = unminifiedJavascript?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const unusedCssRulesSavingBytesText = unusedCssRules?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const unusedCssRulesSavingMsText = unusedCssRules?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const unusedJsSavingBytesText = unusedJavascript?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const unusedJsSavingMsText = unusedJavascript?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const usesTextCompressionBytesText = usesTextCompression?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const usesTextCompressionMsText = usesTextCompression?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );

  resourceSummaryItems?.forEach((item) => {
    totalSize.push(item.at(0)?.transferSize);
    fontSize.push(item.at(1)?.transferSize);
    imageSize.push(item.at(2)?.transferSize);
    mediaSize.push(item.at(3)?.transferSize);
    scriptSize.push(item.at(4)?.transferSize);
    stylesheetSize.push(item.at(5)?.transferSize);
    documentSize.push(item.at(6)?.transferSize);
    otherSize.push(item.at(7)?.transferSize);
    thirdPartySize.push(item.at(8)?.transferSize);
  });
  const content = [
    h3('Size Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Total Size', ...totalSize]),
    tBody(['Uses Text Compression Saving Bytes', ...usesTextCompressionBytesText]),
    tBody(['Uses Text Compression Saving Ms', ...usesTextCompressionMsText]),
    tBody(['Font Size', ...fontSize]),
    tBody(['Image Size', ...imageSize]),
    tBody(['Media Size', ...mediaSize]),
    tBody(['Script Size', ...scriptSize]),
    tBody(['Unminified JS Saving Bytes', ...unminifiedJsSavingBytesText]),
    tBody(['Unminified JS Saving ms', ...unminifiedJsSavingMsText]),
    tBody(['Unused JS Saving Bytes', ...unusedJsSavingBytesText]),
    tBody(['Unused Js Saving ms', ...unusedJsSavingMsText]),
    tBody(['Stylesheet Size', ...stylesheetSize]),
    tBody(['Unminified CSS Saving Bytes', ...unminifiedCssSavingBytesText]),
    tBody(['Unminified CSS Saving ms', ...unminifiedCssSavingMsText]),
    tBody(['Unused CSS Saving Bytes', ...unusedCssRulesSavingBytesText]),
    tBody(['Unused CSS Saving ms', ...unusedCssRulesSavingMsText]),
    tBody(['Document Size', ...documentSize]),
    tBody(['Other Size', ...otherSize]),
    tBody(['Third Party Size', ...thirdPartySize]),
  ];

  return content;
}

function getImageMetrics(company, modernImageFormats, offscreenImages, usesOptimizedImages, usesResponsiveImages) {
  const modernImageFormatsBytesText = modernImageFormats?.map(
    ({ score: mScore, overallSavingsBytes }) => `${score(mScore)} ${overallSavingsBytes}`,
  );
  const modernImageFormatsMsText = modernImageFormats?.map(
    ({ score: mScore, overallSavingsMs }) => `${score(mScore)} ${overallSavingsMs}`,
  );
  const offscreenImagesByteText = offscreenImages?.map(
    ({ score: oScore, overallSavingsBytes }) => `${score(oScore)} ${overallSavingsBytes}`,
  );
  const offscreenImagesMsText = offscreenImages?.map(
    ({ score: oScore, overallSavingsMs }) => `${score(oScore)} ${overallSavingsMs}`,
  );
  const usesOptimizedImagesBytesText = usesOptimizedImages?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const usesOptimizedImagesMsText = usesOptimizedImages?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const usesResponsiveImagesBytesText = usesResponsiveImages?.map(
    ({ score: uScore, overallSavingsBytes }) => `${score(uScore)} ${overallSavingsBytes}`,
  );
  const usesResponsiveImagesMsText = usesResponsiveImages?.map(
    ({ score: uScore, overallSavingsMs }) => `${score(uScore)} ${overallSavingsMs}`,
  );
  const content = [
    h3('Image Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Modern Image Format Saving Bytes', ...modernImageFormatsBytesText]),
    tBody(['Modern Image Format Saving ms', ...modernImageFormatsMsText]),
    tBody(['Offscreen Images Saving Bytes', ...offscreenImagesByteText]),
    tBody(['Offscreen Format Saving ms', ...offscreenImagesMsText]),
    tBody(['Uses Optimized Images Saving Bytes', ...usesOptimizedImagesBytesText]),
    tBody(['Uses Optimized Images Saving Ms', ...usesOptimizedImagesMsText]),
    tBody(['Uses Responsive Images Saving Bytes', ...usesResponsiveImagesBytesText]),
    tBody(['Uses Responsive Images Saving ms', ...usesResponsiveImagesMsText]),
  ];

  return content;
}

function getEtcs(company, finalScreenshot, legacyJavascript, thirdPartySummary) {
  const legacyJavascriptBytesText = legacyJavascript?.map(
    ({ score: lScore, overallSavingsBytes }) => `${score(lScore)} ${overallSavingsBytes}`,
  );
  const legacyJavascriptMsText = legacyJavascript?.map(
    ({ score: lScore, overallSavingsMs }) => `${score(lScore)} ${overallSavingsMs}`,
  );
  const thirdPartyWastedBytesText = thirdPartySummary?.map(
    ({ score: tScore, wastedBytes }) => `${score(tScore)} ${wastedBytes}`,
  );
  const thirdPartyWastedMsText = thirdPartySummary?.map(
    ({ score: tScore, wastedMs }) => `${score(tScore)} ${wastedMs}`,
  );
  const content = [
    h3('ETC Metrics'),
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Final Screenshot Time', ...finalScreenshot]),
    tBody(['Legacy Javascript Overall Savings Bytes', ...legacyJavascriptBytesText]),
    tBody(['Legacy Javascript Overall Savings ms', ...legacyJavascriptMsText]),
    tBody(['Third Party Wasted Bytes', ...thirdPartyWastedBytesText]),
    tBody(['Third Party Wasted ms', ...thirdPartyWastedMsText]),
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
  const totalByteWeight: {
    totalByteWeight: number;
    score: number;
  }[] = [];
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
  // const metrics = []
  const modernImageFormats: {
    score: Number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const offscreenImages: {
    score: Number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const resourceSummaryItems: {
    resourceType: string;
    label: string;
    requestCount: number;
    transferSize: number;
  }[] = [];
  const serverResponseTime: {
    score: number;
    overallSavingsMs: number;
  }[] = [];
  const speedIndex: {
    numbericValue: number;
    score: number;
  }[] = [];
  const thirdPartySummary: {
    score: number;
    wastedBytes: number;
    wastedMs: number;
  }[] = [];
  const totalBlockingTime: {
    numbericValue: number;
    score: number;
  }[] = [];
  const unminifiedCss: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const unminifiedJavascript: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const unusedCssRules: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const unusedJavascript: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const usesLongCacheTtl: {
    score: number;
    wastedBytes: number;
  }[] = [];
  const usesOptimizedImages: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const usesRelPreconnect: {
    score: number;
    overallSavingsMs: number;
  }[] = [];
  const usesResponsiveImages: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
  }[] = [];
  const usesTextCompression: {
    score: number;
    overallSavingsBytes: number;
    overallSavingsMs: number;
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
    totalByteWeight.push({
      totalByteWeight: audits['diagnostics']?.totalByteWeight,
      score: audits['total-byte-weight']?.score,
    });
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
    modernImageFormats.push(audits['modern-image-formats']);
    offscreenImages.push(audits['offscreen-images']);
    resourceSummaryItems.push(audits['resource-summary']?.items);
    serverResponseTime.push(audits['server-response-time']);
    speedIndex.push(audits['speed-index']);
    thirdPartySummary.push(audits['third-party-summary']);
    totalBlockingTime.push(audits['total-blocking-time']);
    unminifiedCss.push(audits['unminified-css']);
    unminifiedJavascript.push(audits['unminified-javascript']);
    unusedCssRules.push(audits['unused-css-rules']);
    unusedJavascript.push(audits['unused-javascript']);
    usesLongCacheTtl.push(audits['uses-long-cache-ttl']);
    usesOptimizedImages.push(audits['uses-optimized-images']);
    usesRelPreconnect.push(audits['uses-rel-preconnect']);
    usesResponsiveImages.push(audits['uses-responsive-images']);
    usesTextCompression.push(audits['uses-text-compression']);
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
    ...getBasicMetrics(company, interactive, maxPotentialFid, speedIndex),
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
      serverResponseTime,
      totalBlockingTime,
      usesLongCacheTtl,
      usesRelPreconnect,
    ),
    BREAK_LINE,
    ...getDomMetrics(company, totalDomElements, maximumDomDepth, maximumChildElements),
    BREAK_LINE,
    ...getSizeMetrics(
      company,
      resourceSummaryItems,
      unminifiedCss,
      unminifiedJavascript,
      unusedCssRules,
      unusedJavascript,
      usesTextCompression,
    ),
    BREAK_LINE,
    ...getImageMetrics(company, modernImageFormats, offscreenImages, usesOptimizedImages, usesResponsiveImages),
    BREAK_LINE,
    ...getEtcs(company, finalScreenshot, legacyJavascript, thirdPartySummary),
  ];
}
