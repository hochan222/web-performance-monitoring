import * as fs from 'fs';

export function guaranteeFolderPath(path: string): void {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export function write({ path, content, type = 'json' }: { path: string; content: any; type: string }): void {
  if (type === 'json') {
    fs.writeFileSync(path, JSON.stringify(content));
    return;
  }
  if (type === 'string') {
    fs.writeFileSync(path, content);
    return;
  }
  console.warn('[file.ts] function write: \n No type specified.');
}
