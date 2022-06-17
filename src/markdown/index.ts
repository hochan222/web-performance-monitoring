import * as fs from 'fs';
import { readFile } from 'fs/promises';
import { PERSISTENT_DATA_PATH, REPORT_PATH } from '../libs/constants';
import { getDirectoryFileList, guaranteeFolderPath, write } from '../libs/file';
import { getDate } from '../libs/utils';
import { generateAuditsDiff } from './diff/audits';
import { generateCategoryDiff } from './diff/categories';
import { generateAuditsMarkdown } from './lhr/audits';
import { generateCategoryMarkdown } from './lhr/categories';
import { BREAK_LINE, h1 } from './markdown';

export async function generateReport({ path }) {
  const data = JSON.parse(await readFile(`${PERSISTENT_DATA_PATH}/${path}/${getDate()}.json`, 'utf8'));
  const { categories, audits } = data;

  const content = [
    h1('Web Performance Report'),
    BREAK_LINE,
    ...(await generateCategoryMarkdown(path, categories)),
    BREAK_LINE,
    ...(await generateAuditsMarkdown(path, audits)),
    BREAK_LINE,
  ].join('\n');

  guaranteeFolderPath(`./${REPORT_PATH}`);
  write({ path: `${REPORT_PATH}/${path}-report.md`, content, type: 'string' });
}

function sortLastestDate(data) {
  return data.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}

function getLastestDate(path: string) {
  return sortLastestDate(getDirectoryFileList(`${PERSISTENT_DATA_PATH}/${path}/`)).at(0);
}

async function getPersistentData(data, isFastOption) {
  const folderPath = (name) => (isFastOption ? `${name}-fast` : name);
  return Promise.all(
    data.map(async ({ company, name, url }) => ({
      company,
      name,
      url,
      data: JSON.parse(
        await readFile(`${PERSISTENT_DATA_PATH}/${folderPath(name)}/${getLastestDate(folderPath(name))}.json`, 'utf8'),
      ),
    })),
  );
}

export async function generateDiff(
  data: {
    company: string;
    name: string;
    url: string;
  }[],
  isFastOption: boolean,
) {
  const path = isFastOption ? `${REPORT_PATH}/total-fast-report.md` : `${REPORT_PATH}/total-report.md`;
  const persistentData = await getPersistentData(data, isFastOption);

  const content = [
    h1('Web Performance Report'),
    BREAK_LINE,
    ...(await generateCategoryDiff(persistentData)),
    BREAK_LINE,
    ...(await generateAuditsDiff(persistentData)),
  ].join('\n');

  guaranteeFolderPath(`./${REPORT_PATH}`);
  write({ path, content, type: 'string' });
}
