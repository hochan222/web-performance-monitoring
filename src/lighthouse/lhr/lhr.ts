import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { toFixedTwo } from '../../libs/utils';
import { reportAudits } from './audits';
import { reportCategories } from './categories';

function reportLhrSummary(lhr, path) {
  const { finalUrl, lighthouseVersion, fetchTime, configSettings } = lhr;
  const { throttling } = configSettings;
  const {
    rttMs,
    throughputKbps,
    requestLatencyMs,
    downloadThroughputKbps,
    uploadThroughputKbps,
    cpuSlowdownMultiplier,
  } = throttling;
  const lhrSummary = {
    finalUrl,
    lighthouseVersion,
    fetchTime,
    throttling: {
      rttMs,
      throughputKbps: toFixedTwo(throughputKbps),
      requestLatencyMs: toFixedTwo(requestLatencyMs),
      downloadThroughputKbps: toFixedTwo(downloadThroughputKbps),
      uploadThroughputKbps,
      cpuSlowdownMultiplier,
    },
  };
  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({ path: `${TEMP_DATA_PATH}/${path}/lhr-summary.json`, content: lhrSummary, type: 'json' });
}

export function reportLhr(lhr, path) {
  const { audits, categories } = lhr;

  reportAudits(audits, path);
  reportCategories(categories, path);
  reportLhrSummary(lhr, path);

  // temp
  write({ path: `${TEMP_DATA_PATH}/${path}/lhr.json`, content: lhr, type: 'json' });
}
