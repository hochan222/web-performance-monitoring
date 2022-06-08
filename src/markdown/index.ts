import { guaranteeFolderPath, write } from '../libs/file';
import { generateAuditsMarkdown } from './lhr/audits';
import { generateCategoryMarkdown } from './lhr/categories';
import { BREAK_LINE, h1 } from './markdown';

export async function generateMarkdown() {
  const content = [
    h1('Web Performance Report'),
    BREAK_LINE,
    ...(await generateCategoryMarkdown()),
    BREAK_LINE,
    ...(await generateAuditsMarkdown()),
    BREAK_LINE,
  ].join('\n');
  guaranteeFolderPath('./history');
  write({ path: `history/report.md`, content, type: 'string' });
}
