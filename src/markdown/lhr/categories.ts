import { readFile } from 'fs/promises';
import { TEMP_DATA_PATH } from '../../libs/constants';
import { score, toFixedTwo } from '../../libs/utils';
import { tAlignLine, tBody, tHead } from '../markdown';

export async function generateCategoryMarkdown(path, categories): Promise<string[]> {
  let staticCategories = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/category-summary.txt`, 'utf8'));

  return [
    tHead(staticCategories.map((category) => category.title)),
    tAlignLine(categories.length, 'center'),
    tBody(categories.map((category) => `${score(category.score)} ${toFixedTwo(category.score)}`)),
  ];
}
