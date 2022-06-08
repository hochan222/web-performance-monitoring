import { REPORT_PATH } from '../libs/constants';
import { guaranteeFolderPath, write } from '../libs/file';
import { generateAuditsMarkdown } from './lhr/audits';
import { generateCategoryMarkdown } from './lhr/categories';
import { BREAK_LINE, h1 } from './markdown';

export async function generateMarkdown({ path }) {
  const content = [
    h1('Web Performance Report'),
    BREAK_LINE,
    ...(await generateCategoryMarkdown(path)),
    BREAK_LINE,
    ...(await generateAuditsMarkdown(path)),
    BREAK_LINE,
  ].join('\n');

  guaranteeFolderPath(`./${REPORT_PATH}/${path}`);
  write({ path: `${REPORT_PATH}/${path}/report.md`, content, type: 'string' });
}
