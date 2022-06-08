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

export async function l2s({ path }: { path: string }) {
  let audits = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/audit-summary.json`, 'utf8'));
  let categories = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/category-summary.txt`, 'utf8'));
  let lhr = JSON.parse(await readFile(`${TEMP_DATA_PATH}/${path}/lhr-summary.json`, 'utf8'));

  await initPersistenceData(path);
  await updatePersistenceData({ path, audits, categories, lhr });
}
