import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';

function reportAuditSummary(audits, path) {
  const bootupTime = audits['bootup-time'];
  const auditSummary = {
    'bootup-time': {
      numericValue: bootupTime.numericValue,
      items: bootupTime.details.items,
      score: bootupTime.score,
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
