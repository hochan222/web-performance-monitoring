import { TEMP_DATA_PATH } from '../libs/constants';
import { guaranteeFolderPath, write } from '../libs/file';
import { convertPercentage, toFixedTwo } from '../libs/utils';
import { reportCategories } from './lhr/categories';
import { reportLhr } from './lhr/lhr';

export function generateTempData(data, path) {
  const { lhr, artifacts, report } = data;

  reportLhr(lhr, path);

  console.log('Generate Temp Data is done for', lhr.finalUrl);
}

export function generateOnlyPerformanceTempData(data, path) {
  const { lhr } = data;

  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({
    path: `${TEMP_DATA_PATH}/${path}/only-performance.json`,
    content: { performance: toFixedTwo(convertPercentage(lhr.categories.performance.score)) },
    type: 'json',
  });
}
