import { guaranteeFolderPath, write } from '../../libs/file';
import { reportAudits } from './audits';

function reportLhrSummary(lhr) {
  const { finalUrl, lighthouseVersion, fetchTime } = lhr;
  const lhrSummary = {
    finalUrl,
    lighthouseVersion,
    fetchTime,
  };
  guaranteeFolderPath('./report');
  write({ path: 'report/lhr-summary.json', content: lhrSummary, type: 'json' });
}

export function reportLhr(lhr) {
  reportAudits(lhr);
  reportLhrSummary(lhr);
}
