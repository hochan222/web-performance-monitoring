import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { convertPercentage, toFixedTwo } from '../../libs/utils';

function reportCategorySummary(categories, path) {
  const { accessibility, performance, pwa, seo } = categories;
  const bestPractice = categories['best-practices'];

  const categorySummary = [
    {
      id: accessibility.id,
      title: accessibility.title,
      score: toFixedTwo(convertPercentage(accessibility.score)),
    },
    {
      id: bestPractice.id,
      title: bestPractice.title,
      score: toFixedTwo(convertPercentage(bestPractice.score)),
    },
    {
      id: performance.id,
      title: performance.title,
      score: toFixedTwo(convertPercentage(performance.score)),
    },
    {
      id: pwa.id,
      title: pwa.title,
      score: toFixedTwo(convertPercentage(pwa.score)),
    },
    {
      id: seo.id,
      title: seo.title,
      score: toFixedTwo(convertPercentage(seo.score)),
    },
  ];
  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({ path: `${TEMP_DATA_PATH}/${path}/category-summary.txt`, content: categorySummary, type: 'array' });
}

export function reportCategories(categories, path) {
  reportCategorySummary(categories, path);
  guaranteeFolderPath(`./${TEMP_DATA_PATH}/${path}`);
  write({ path: `${TEMP_DATA_PATH}/${path}/categories.json`, content: categories, type: 'json' });
  return;
}
