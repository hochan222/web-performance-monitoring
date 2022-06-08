import { guaranteeFolderPath, write } from '../../libs/file';

export function reportAudits(lhr) {
  const { audits } = lhr;

  guaranteeFolderPath('./report');
  write({ path: 'report/audits.json', content: audits, type: 'json' });
  // temp
  write({ path: 'report/lhr.json', content: lhr, type: 'json' });
  return;
}
