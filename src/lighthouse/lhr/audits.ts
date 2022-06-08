import { guaranteeFolderPath, write } from '../../libs/file';

export function reportAudits(audits) {
  guaranteeFolderPath('./report');
  write({ path: 'report/audits.json', content: audits, type: 'json' });
  return;
}
