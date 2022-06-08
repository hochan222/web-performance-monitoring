import { readFile } from 'fs/promises';
import { score } from '../../libs/utils';
import { tAlignLine, tBody, tHead } from '../markdown';

export async function generateCategoryMarkdown(): Promise<string[]> {
  let categories = JSON.parse(await readFile('report/category-summary.txt', 'utf8'));

  return [
    tHead(categories.map((category) => category.title)),
    tAlignLine(categories.length, 'center'),
    tBody(categories.map((category) => score(category.score * 100))),
  ];
}
