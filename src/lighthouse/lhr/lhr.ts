import { guaranteeFolderPath, write } from '../../libs/file';
import { reportAudits } from './audits';
import { reportCategories } from './categories';

function reportLhrSummary(lhr) {
  const { finalUrl, lighthouseVersion, fetchTime, configSettings } = lhr;
  const { throttling } = configSettings;
  const lhrSummary = {
    finalUrl,
    lighthouseVersion,
    fetchTime,
    throttling,
  };
  guaranteeFolderPath('./report');
  write({ path: 'report/lhr-summary.json', content: lhrSummary, type: 'json' });
}

export function reportLhr(lhr) {
  const { audits, categories } = lhr;

  reportAudits(audits);
  reportCategories(categories);
  reportLhrSummary(lhr);

  // temp
  write({ path: 'report/lhr.json', content: lhr, type: 'json' });
}
