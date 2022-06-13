import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { convertPercentage, toFixedTwo } from '../../libs/utils';

function reportAuditSummary(audits, path) {
  const bootupTime = audits['bootup-time'];
  const criticalRequestChains = audits['critical-request-chains'];
  const cumulativeLayoutShift = audits['cumulative-layout-shift'];
  const diagnostics = audits['diagnostics'];
  const domSize = audits['dom-size'];
  const finalScreenshot = audits['final-screenshot'];
  const firstContentfulPaint = audits['first-contentful-paint'];
  const firstMeaningfulPaint = audits['first-meaningful-paint'];
  const fontDisplay = audits['font-display'];
  const interactive = audits['interactive'];
  const largestContentfulPaint = audits['largest-contentful-paint'];
  const legacyJavascript = audits['legacy-javascript'];
  const mainthreadWorkBreakdown = audits['mainthread-work-breakdown'];
  const maxPotentialFid = audits['max-potential-fid'];
  const metrics = audits['metrics'];
  const modernImageFormats = audits['modern-image-formats'];
  const networkRtt = audits['network-rtt'];
  const networkServerLatency = audits['network-server-latency'];
  const offscreenImages = audits['offscreen-images'];
  const preloadLcpImage = audits['preload-lcp-image'];
  const renderBlockingResources = audits['render-blocking-resources'];
  const resourceSummary = audits['resource-summary'];
  const serverResponseTime = audits['server-response-time'];
  const speedIndex = audits['speed-index'];
  const thirdPartySummary = audits['third-party-summary'];
  const totalBlockingTime = audits['total-blocking-time'];
  const totalByteWeight = audits['total-byte-weight'];
  const unminifiedCss = audits['unminified-css'];
  const unminifiedJavascript = audits['unminified-javascript'];
  const unusedCssRules = audits['unused-css-rules'];
  const unusedJavascript = audits['unused-javascript'];
  const usesLongCacheTtl = audits['uses-long-cache-ttl'];
  const usesOptimizedImages = audits['uses-optimized-images'];
  const usesRelPreconnect = audits['uses-rel-preconnect'];
  const usesResponsiveImages = audits['uses-responsive-images'];
  const usesTextCompression = audits['uses-text-compression'];

  const auditSummary = {
    'bootup-time': {
      numericValue: toFixedTwo(bootupTime.numericValue),
      score: convertPercentage(bootupTime.score),
    },
    'critical-request-chains': {
      displayValue: criticalRequestChains.displayValue,
    },
    'cumulative-layout-shift': {
      displayValue: cumulativeLayoutShift.displayValue,
      score: cumulativeLayoutShift.score,
    },
    diagnostics: {
      items: diagnostics.details?.items,
    },
    'dom-size': {
      score: domSize.score,
      totalDomElements: domSize.details?.items[0].value,
      maximumDomDepth: domSize.details?.items[1].value,
      maximumChildElements: domSize.details?.items[2].value,
    },
    'final-screenshot': {
      timing: finalScreenshot.details?.timing,
    },
    'first-contentful-paint': {
      numericValue: toFixedTwo(firstContentfulPaint.numericValue),
      score: convertPercentage(firstContentfulPaint.score),
    },
    'first-meaningful-paint': {
      numericValue: toFixedTwo(firstMeaningfulPaint.numericValue),
      score: convertPercentage(firstMeaningfulPaint.score),
    },
    'font-display': {
      score: convertPercentage(fontDisplay.score),
      items: fontDisplay.details?.items,
    },
    interactive: {
      numericValue: toFixedTwo(interactive.numericValue),
      score: convertPercentage(interactive.score),
    },
    'largest-contentful-paint': {
      numericValue: toFixedTwo(largestContentfulPaint.numericValue),
      score: convertPercentage(largestContentfulPaint.score),
    },
    'legacy-javascript': {
      overallSavingsBytes: legacyJavascript.details?.overallSavingsBytes,
      overallSavingsMs: legacyJavascript.details?.overallSavingsMs,
      score: convertPercentage(legacyJavascript.score),
    },
    'mainthread-work-breakdown': {
      numericValue: toFixedTwo(mainthreadWorkBreakdown.numericValue),
      score: convertPercentage(mainthreadWorkBreakdown.score),
    },
    'max-potential-fid': {
      numericValue: maxPotentialFid.numericValue,
      score: convertPercentage(maxPotentialFid.score),
    },
    metrics: {
      items: metrics.details?.items,
    },
    'modern-image-formats': {
      score: convertPercentage(modernImageFormats.score),
      overallSavingsBytes: toFixedTwo(modernImageFormats.details?.overallSavingsBytes),
      overallSavingsMs: modernImageFormats.details?.overallSavingsMs,
    },
    'network-rtt': {
      longestRtt: toFixedTwo(networkRtt.numericValue),
    },
    'network-server-latency': {
      longestServerLatency: toFixedTwo(networkServerLatency.numericValue),
    },
    'offscreen-images': {
      overallSavingsBytes: offscreenImages.details?.overallSavingsBytes,
      overallSavingsMs: offscreenImages.details?.overallSavingsMs,
      score: convertPercentage(offscreenImages.score),
    },
    'preload-lcp-image': {
      score: convertPercentage(preloadLcpImage.score),
      overallSavingsMs: preloadLcpImage.details?.overallSavingsMs,
    },
    'render-blocking-resources': {
      overallSavingsMs: renderBlockingResources.details?.overallSavingsMs,
      score: convertPercentage(renderBlockingResources.score),
    },
    'resource-summary': {
      items: resourceSummary.details?.items,
    },
    'server-response-time': {
      score: convertPercentage(serverResponseTime.score),
      overallSavingsMs: toFixedTwo(serverResponseTime.details?.overallSavingsMs),
    },
    'speed-index': {
      numericValue: toFixedTwo(speedIndex.numericValue),
      score: convertPercentage(speedIndex.score),
    },
    'third-party-summary': {
      score: convertPercentage(thirdPartySummary.score),
      wastedBytes: thirdPartySummary.details?.summary?.wastedBytes,
      wastedMs: thirdPartySummary.details?.summary?.wastedMs,
    },
    'total-blocking-time': {
      numericValue: toFixedTwo(totalBlockingTime.numericValue),
      score: convertPercentage(totalBlockingTime.score),
    },
    'total-byte-weight': {
      numericValue: toFixedTwo(totalByteWeight.numericValue),
      score: convertPercentage(totalByteWeight.score),
    },
    'unminified-css': {
      score: convertPercentage(unminifiedCss.score),
      overallSavingsBytes: unminifiedCss.details?.overallSavingsBytes,
      overallSavingsMs: unminifiedCss.details?.overallSavingsMs,
    },
    'unminified-javascript': {
      score: convertPercentage(unminifiedJavascript.score),
      overallSavingsBytes: unminifiedJavascript.details?.overallSavingsBytes,
      overallSavingsMs: unminifiedJavascript.details?.overallSavingsMs,
    },
    'unused-css-rules': {
      score: convertPercentage(unusedCssRules.score),
      overallSavingsBytes: unusedCssRules.details?.overallSavingsBytes,
      overallSavingsMs: unusedCssRules.details?.overallSavingsMs,
    },
    'unused-javascript': {
      score: convertPercentage(unusedJavascript.score),
      overallSavingsBytes: unusedJavascript.details?.overallSavingsBytes,
      overallSavingsMs: unusedJavascript.details?.overallSavingsMs,
    },
    'uses-long-cache-ttl': {
      score: convertPercentage(usesLongCacheTtl.score),
      wastedBytes: toFixedTwo(usesLongCacheTtl.details?.summary?.wastedBytes),
    },
    'uses-optimized-images': {
      score: convertPercentage(usesOptimizedImages.score),
      overallSavingsMs: usesOptimizedImages.details?.overallSavingsMs,
      overallSavingsBytes: usesOptimizedImages.details?.overallSavingsBytes,
    },
    'uses-rel-preconnect': {
      score: convertPercentage(usesRelPreconnect.score),
      overallSavingsMs: toFixedTwo(usesRelPreconnect.details?.overallSavingsMs),
    },
    'uses-responsive-images': {
      score: convertPercentage(usesResponsiveImages.score),
      overallSavingsBytes: toFixedTwo(usesResponsiveImages.details?.overallSavingsBytes),
      overallSavingsMs: toFixedTwo(usesResponsiveImages.details?.overallSavingsMs),
    },
    'uses-text-compression': {
      score: convertPercentage(usesTextCompression.score),
      overallSavingsBytes: toFixedTwo(usesTextCompression.details?.overallSavingsBytes),
      overallSavingsMs: toFixedTwo(usesTextCompression.details?.overallSavingsMs),
    },
  };

  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({ path: `${TEMP_DATA_PATH}/${path}/audit-summary.json`, content: auditSummary, type: 'json' });
}

export function reportAudits(audits, path) {
  reportAuditSummary(audits, path);
  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({ path: `${TEMP_DATA_PATH}/${path}/audits.json`, content: audits, type: 'json' });
  return;
}
