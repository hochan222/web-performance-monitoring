import { readFile } from 'fs/promises';
import { PERSISTENT_DATA_PATH, TEMP_DATA_PATH } from './libs/constants';
import { guaranteeFolderPath, isExistFile, write } from './libs/file';
import { getDate } from './libs/utils';

async function initPersistenceData(fileName) {
  const exist = await isExistFile(`${PERSISTENT_DATA_PATH}/${fileName}/${getDate()}`);
  if (!exist) {
    guaranteeFolderPath(`./${PERSISTENT_DATA_PATH}/${fileName}`);
    write({ path: `${PERSISTENT_DATA_PATH}/${fileName}/${getDate()}.json`, content: {}, type: 'json' });
  }
}

async function updatePersistenceData({ path, ...data }) {
  const parsedData = {
    ...data,
    ...JSON.parse(await readFile(`${PERSISTENT_DATA_PATH}/${path}/${getDate()}.json`, 'utf8')),
  };
  guaranteeFolderPath(`./${PERSISTENT_DATA_PATH}`);
  write({ path: `${PERSISTENT_DATA_PATH}/${path}/${getDate()}.json`, content: parsedData, type: 'json' });
}

function getNormalPath(path) {
  return path.slice(0, -5);
}

async function getCategories(path, isFastOption) {
  if (isFastOption) {
    const categories = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/category-summary.txt`, 'utf8'));
    const performanceScore = JSON.parse(
      await readFile(`${TEMP_DATA_PATH}/${getNormalPath(path)}/category-summary.txt`, 'utf8'),
    )[2].score;

    return categories?.map(({ id, title, score }) => {
      if (id === 'performance') {
        return { id, title, score: performanceScore };
      }
      return { id, title, score };
    });
  }
  return JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/category-summary.txt`, 'utf8'));
}

export async function l2s({ path, isFastOption }: { path: string; isFastOption: boolean }) {
  let audits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audit-summary.json`, 'utf8'));
  let categories = await getCategories(path, isFastOption);
  let lhr = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/lhr-summary.json`, 'utf8'));

  await initPersistenceData(path);
  await updatePersistenceData({ path, audits, categories, lhr });
}
