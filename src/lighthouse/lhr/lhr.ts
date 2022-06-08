import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { reportAudits } from './audits';
import { reportCategories } from './categories';

function reportLhrSummary(lhr, path) {
  const { finalUrl, lighthouseVersion, fetchTime, configSettings } = lhr;
  const { throttling } = configSettings;
  const lhrSummary = {
    finalUrl,
    lighthouseVersion,
    fetchTime,
    throttling,
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
