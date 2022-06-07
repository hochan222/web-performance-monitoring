import { readFile } from 'fs/promises';

export async function l2s() {
  let audits = JSON.parse(await readFile('report/audits.json', 'utf8'));

  return;
}
