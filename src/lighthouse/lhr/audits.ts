import { guaranteeFolderPath, write } from '../../libs/file';

export function reportAudits(lhr) {
  const { audits } = lhr;

  console.log(audits);

  guaranteeFolderPath('./report');
  write({ path: 'report/audits.json', content: audits, type: 'json' });

  return;
}
