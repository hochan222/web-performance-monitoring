import { score } from '../../libs/utils';
import { hyperLink, tAlignLine, tBody, tHead } from '../markdown';

export async function generateCategoryDiff(persistentData): Promise<string[]> {
  const company = [''];
  const accessibility: string[] = [];
  const bestPractice: string[] = [];
  const performance: string[] = [];
  const pwa: string[] = [];
  const seo: string[] = [];

  persistentData.forEach(({ data, company: cp, url }) => {
    const { categories } = data;
    company.push(hyperLink(cp, url));
    accessibility.push(`${score(categories[0].score)} ${categories[0].score}`);
    bestPractice.push(`${score(categories[1].score)} ${categories[1].score}`);
    performance.push(`${score(categories[2].score)} ${categories[2].score}`);
    pwa.push(`${score(categories[3].score)} ${categories[3].score}`);
    seo.push(`${score(categories[4].score)} ${categories[4].score}`);
  });

  return [
    tHead(company),
    tAlignLine(company.length, 'center'),
    tBody(['Accessibility', ...accessibility]),
    tBody(['Best Practice', ...bestPractice]),
    tBody(['Performance', ...performance]),
    tBody(['PWA', ...pwa]),
    tBody(['SEO', ...seo]),
  ];
}
