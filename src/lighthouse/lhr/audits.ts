import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { convertPercentage, toFixedTwo } from '../../libs/utils';

function reportAuditSummary(audits, path) {
  const bootupTime = audits['bootup-time'];
  const criticalRequestChains = audits['critical-request-chains'];
  const cumulativeLayoutShift = audits['cumulative-layout-shift'];
  const diagnostics = audits['diagnostics'];
  const domSize = audits['dom-size'];
  const duplicatedJavascript = audits['duplicated-javascript'];
  const efficientAnimatedContent = audits['efficient-animated-content'];
  const finalScreenshot = audits['final-screenshot'];
  const firstContentfulPaint = audits['first-contentful-paint'];
  const firstMeaningfulPaint = audits['first-meaningful-paint'];
  const fontDisplay = audits['font-display'];
  const fullPageScreenshot = audits['full-page-screenshot'];
  const interactive = audits['interactive'];
  const largestContentfulPaint = audits['largest-contentful-paint'];
  const largestContentfulPaintElement = audits['largest-contentful-paint-element'];
  const layoutShiftElements = audits['layout-shift-elements'];
  const lcpLazyLoaded = audits['lcp-lazy-loaded'];
  const legacyJavascript = audits['legacy-javascript'];
  const longTasks = audits['long-tasks'];
  const mainThreadTasks = audits['main-thread-tasks'];
  const mainthreadWorkBreakdown = audits['mainthread-work-breakdown'];
  const maxPotentialFid = audits['max-potential-fid'];
  const metrics = audits['metrics'];
  const modernImageFormats = audits['modern-image-formats'];
  const networkRequests = audits['network-requests'];
  const networkRtt = audits['network-rtt'];
  const networkServerLatency = audits['network-server-latency'];
  const noDocumentWrite = audits['no-document-write'];
  const noUnloadListeners = audits['no-unload-listeners'];
  const nonCompositedAnimations = audits['non-composited-animations'];
  const offscreenImages = audits['offscreen-images'];
  const performanceBudget = audits['performance-budget'];
  const preloadLcpImage = audits['preload-lcp-image'];
  const redirects = audits['redirects'];
  const renderBlockingResources = audits['render-blocking-resources'];
  const resourceSummary = audits['resource-summary'];
  const screenshotThumbnails = audits['screenshot-thumbnails'];
  const scriptTreemapData = audits['script-treemap-data'];
  const serverResponseTime = audits['server-response-time'];
  const speedIndex = audits['speed-index'];
  const thirdPartyFacades = audits['third-party-facades'];
  const thirdPartySummary = audits['third-party-summary'];
  const timingBudget = audits['timing-budget'];
  const totalBlockingTime = audits['total-blocking-time'];
  const totalByteWeight = audits['total-byte-weight'];
  const unminifiedCss = audits['unminified-css'];
  const unminifiedJavascript = audits['unminified-javascript'];
  const unsizedImages = audits['unsized-images'];
  const unusedCssRules = audits['unused-css-rules'];
  const unusedJavascript = audits['unused-javascript'];
  const userTimings = audits['user-timings'];
  const usesHttp2 = audits['uses-http2'];
  const usesLongCacheTtl = audits['uses-long-cache-ttl'];
  const usesOptimizedImages = audits['uses-optimized-images'];
  const usesPassiveEventListeners = audits['uses-passive-event-listeners'];
  const usesRelPreconnect = audits['uses-rel-preconnect'];
  const usesRelPreload = audits['uses-rel-preload'];
  const usesResponsiveImages = audits['uses-responsive-images'];
  const usesTextCompression = audits['uses-text-compression'];
  const viewport = audits['viewport'];

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
      items: diagnostics.details.items,
    },
    'dom-size': {
      score: domSize.score,
      totalDomElements: domSize.details.items[0].value,
      maximumDomDepth: domSize.details.items[1].value,
      maximumChildElements: domSize.details.items[2].value,
    },
    'final-screenshot': {
      timing: finalScreenshot.details.timing,
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
      items: fontDisplay.details.items,
    },
    // 'full-page-screenshot': {
    //   score: fullPageScreenshot.score,
    //   screenshot: fullPageScreenshot.details.screenshot,
    // },
    // interactive: {
    //   displayValue: interactive.displayValue,
    //   numericValue: interactive.numericValue,
    //   score: interactive.score,
    // },
    // 'largest-contentful-paint': {
    //   displayValue: largestContentfulPaint.displayValue,
    //   numericValue: largestContentfulPaint.numericValue,
    //   score: largestContentfulPaint.score,
    // },
    // 'largest-contentful-paint-element': {
    //   displayValue: largestContentfulPaintElement.displayValue,
    //   score: largestContentfulPaintElement.score,
    //   items: largestContentfulPaintElement.details.items,
    // },
    // 'layout-shift-elements': {
    //   displayValue: layoutShiftElements.displayValue,
    //   score: layoutShiftElements.score,
    //   items: layoutShiftElements.details.items,
    // },
    // 'lcp-lazy-loaded': {
    //   score: lcpLazyLoaded.score,
    //   items: lcpLazyLoaded.details.items,
    // },
    // 'legacy-javascript': {
    //   displayValue: legacyJavascript.displayValue,
    //   numericValue: legacyJavascript.numericValue,
    //   score: legacyJavascript.score,
    //   details: legacyJavascript.details,
    // },
    // 'long-tasks': {
    //   displayValue: longTasks.displayValue,
    //   score: longTasks.score,
    //   items: longTasks.details.items,
    // },
    // 'main-thread-tasks': {
    //   items: mainThreadTasks.details.items,
    //   score: mainThreadTasks.score,
    // },
    // 'mainthread-work-breakdown': {
    //   displayValue: mainthreadWorkBreakdown.displayValue,
    //   numericValue: mainthreadWorkBreakdown.numericValue,
    //   score: mainthreadWorkBreakdown.score,
    //   items: mainthreadWorkBreakdown.details.items,
    // },
    // 'max-potential-fid': {
    //   displayValue: maxPotentialFid.displayValue,
    //   numericValue: maxPotentialFid.numericValue,
    //   score: maxPotentialFid.score,
    // },
    // metrics: {
    //   items: metrics.details.items,
    //   numericValue: metrics.numericValue,
    //   score: metrics.score,
    // },
    // 'modern-image-formats': {
    //   displayValue: modernImageFormats.displayValue,
    //   numericValue: modernImageFormats.numericValue,
    //   score: modernImageFormats.score,
    //   details: modernImageFormats.details,
    //   warnings: modernImageFormats.warnings,
    // },
    // 'network-requests': {
    //   score: networkRequests.score,
    //   details: networkRequests.details,
    // },
    // 'network-rtt': {
    //   score: networkRtt.score,
    //   numericValue: networkRtt.numericValue,
    //   displayValue: networkRtt.displayValue,
    //   items: networkRtt.details.items,
    // },
    // 'network-server-latency': {
    //   displayValue: networkServerLatency.displayValue,
    //   numericValue: networkServerLatency.numericValue,
    //   score: networkServerLatency.score,
    //   details: networkServerLatency.details,
    // },
    // 'no-document-write': {
    //   score: noDocumentWrite.score,
    //   details: noDocumentWrite.details,
    // },
    // 'no-unload-listeners': {
    //   score: noUnloadListeners.score,
    // },
    // 'non-composited-animations': {
    //   displayValue: nonCompositedAnimations.displayValue,
    //   score: nonCompositedAnimations.score,
    //   details: nonCompositedAnimations.details,
    // },
    // 'offscreen-images': {
    //   displayValue: offscreenImages.displayValue,
    //   numericValue: offscreenImages.numericValue,
    //   score: offscreenImages.score,
    //   warnings: offscreenImages.warnings,
    //   details: offscreenImages.details,
    // },
    // 'performance-budget': {
    //   score: performanceBudget.score,
    // },
    // 'preload-lcp-image': {
    //   score: preloadLcpImage.score,
    //   numericValue: preloadLcpImage.numericValue,
    //   displayValue: preloadLcpImage.displayValue,
    //   details: preloadLcpImage.details,
    // },
    // redirects: {
    //   displayValue: redirects.displayValue,
    //   numericValue: redirects.numericValue,
    //   score: redirects.score,
    //   details: redirects.details,
    // },
    // 'render-blocking-resources': {
    //   displayValue: renderBlockingResources.displayValue,
    //   numericValue: renderBlockingResources.numericValue,
    //   score: renderBlockingResources.score,
    //   details: renderBlockingResources.details,
    // },
    // 'resource-summary': {
    //   displayValue: resourceSummary.displayValue,
    //   score: resourceSummary.score,
    //   details: resourceSummary.details,
    // },
    // 'screenshot-thumbnails': {
    //   score: screenshotThumbnails.score,
    //   details: screenshotThumbnails.details,
    // },
    // 'script-treemap-data': {
    //   score: scriptTreemapData.score,
    //   details: scriptTreemapData.details,
    // },
    // 'server-response-time': {
    //   displayValue: serverResponseTime.displayValue,
    //   numericValue: serverResponseTime.numericValue,
    //   score: serverResponseTime.score,
    //   details: serverResponseTime.details,
    // },
    // 'speed-index': {
    //   displayValue: speedIndex.displayValue,
    //   numericValue: speedIndex.numericValue,
    //   score: speedIndex.score,
    // },
    // 'third-party-facades': {
    //   score: thirdPartyFacades.score,
    // },
    // 'third-party-summary': {
    //   displayValue: thirdPartySummary.displayValue,
    //   score: thirdPartySummary.score,
    //   details: thirdPartySummary.details,
    // },
    // 'timing-budget': {
    //   score: timingBudget.score,
    // },
    // 'total-blocking-time': {
    //   displayValue: totalBlockingTime.displayValue,
    //   numericValue: totalBlockingTime.numericValue,
    //   score: totalBlockingTime.score,
    // },
    // 'total-byte-weight': {
    //   displayValue: totalByteWeight.displayValue,
    //   numericValue: totalByteWeight.numericValue,
    //   score: totalByteWeight.score,
    //   details: totalByteWeight.details,
    // },
    // 'unminified-css': {
    //   displayValue: unminifiedCss.displayValue,
    //   numericValue: unminifiedCss.numericValue,
    //   score: unminifiedCss.score,
    //   details: unminifiedCss.details,
    // },
    // 'unminified-javascript': {
    //   displayValue: unminifiedJavascript.displayValue,
    //   numericValue: unminifiedJavascript.numericValue,
    //   score: unminifiedJavascript.score,
    //   warnings: unminifiedJavascript.warnings,
    //   details: unminifiedJavascript.details,
    // },
    // 'unsized-images': {
    //   score: unsizedImages.score,
    //   details: unsizedImages.details,
    // },
    // 'unused-css-rules': {
    //   displayValue: unusedCssRules.displayValue,
    //   numericValue: unusedCssRules.numericValue,
    //   score: unusedCssRules.score,
    //   details: unusedCssRules.details,
    // },
    // 'unused-javascript': {
    //   displayValue: unusedJavascript.displayValue,
    //   numericValue: unusedJavascript.numericValue,
    //   score: unusedJavascript.score,
    //   details: unusedJavascript.details,
    // },
    // 'user-timings': {
    //   score: userTimings.score,
    //   details: userTimings.details,
    // },
    // 'uses-http2': {
    //   displayValue: usesHttp2.displayValue,
    //   numericValue: usesHttp2.numericValue,
    //   score: usesHttp2.score,
    //   details: usesHttp2.details,
    // },
    // 'uses-long-cache-ttl': {
    //   displayValue: usesLongCacheTtl.displayValue,
    //   numericValue: usesLongCacheTtl.numericValue,
    //   score: usesLongCacheTtl.score,
    //   details: usesLongCacheTtl.details,
    // },
    // 'uses-optimized-images': {
    //   displayValue: usesOptimizedImages.displayValue,
    //   numericValue: usesOptimizedImages.numericValue,
    //   score: usesOptimizedImages.score,
    //   warnings: usesOptimizedImages.warnings,
    //   details: usesOptimizedImages.details,
    // },
    // 'uses-passive-event-listeners': {
    //   score: usesPassiveEventListeners.score,
    //   details: usesPassiveEventListeners.details,
    // },
    // 'uses-rel-preconnect': {
    //   displayValue: usesRelPreconnect.displayValue,
    //   numericValue: usesRelPreconnect.numericValue,
    //   score: usesRelPreconnect.score,
    //   warnings: [],
    //   details: usesRelPreconnect.details,
    // },
    // 'uses-rel-preload': {
    //   score: usesRelPreload.score,
    //   details: usesRelPreload.details,
    // },
    // 'uses-responsive-images': {
    //   displayValue: usesResponsiveImages.displayValue,
    //   numericValue: usesResponsiveImages.numericValue,
    //   score: usesResponsiveImages.score,
    //   details: usesResponsiveImages.details,
    // },
    // 'uses-text-compression': {
    //   displayValue: usesTextCompression.displayValue,
    //   numericValue: usesTextCompression.numericValue,
    //   score: usesTextCompression.score,
    //   details: usesTextCompression.details,
    // },
    // viewport: {
    //   score: viewport.score,
    //   warnings: viewport.warnings,
    // },
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
