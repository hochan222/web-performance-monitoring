import { guaranteeFolderPath, write } from '../../libs/file';

function reportCategorySummary(categories) {
  const { accessibility, performance, pwa, seo } = categories;
  const bestPractice = categories['best-practices'];

  const categorySummary = [
    {
      id: accessibility.id,
      title: accessibility.title,
      score: accessibility.score,
    },
    {
      id: bestPractice.id,
      title: bestPractice.title,
      score: bestPractice.score,
    },
    {
      id: performance.id,
      title: performance.title,
      score: performance.score,
    },
    {
      id: pwa.id,
      title: pwa.title,
      score: pwa.score,
    },
    {
      id: seo.id,
      title: seo.title,
      score: seo.score,
    },
  ];
  guaranteeFolderPath('./report');
  write({ path: 'report/category-summary.txt', content: categorySummary, type: 'array' });
}

export function reportCategories(categories) {
  reportCategorySummary(categories);
  guaranteeFolderPath('./report');
  write({ path: 'report/categories.json', content: categories, type: 'json' });
  return;
}
