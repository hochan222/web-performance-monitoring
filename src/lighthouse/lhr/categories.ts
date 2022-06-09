import { TEMP_DATA_PATH } from '../../libs/constants';
import { guaranteeFolderPath, write } from '../../libs/file';
import { convertPercentage } from '../../libs/utils';

function reportCategorySummary(categories, path) {
  const { accessibility, performance, pwa, seo } = categories;
  const bestPractice = categories['best-practices'];

  const categorySummary = [
    {
      id: accessibility.id,
      title: accessibility.title,
      score: convertPercentage(accessibility.score),
    },
    {
      id: bestPractice.id,
      title: bestPractice.title,
      score: convertPercentage(bestPractice.score),
    },
    {
      id: performance.id,
      title: performance.title,
      score: convertPercentage(performance.score),
    },
    {
      id: pwa.id,
      title: pwa.title,
      score: convertPercentage(pwa.score),
    },
    {
      id: seo.id,
      title: seo.title,
      score: convertPercentage(seo.score),
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
