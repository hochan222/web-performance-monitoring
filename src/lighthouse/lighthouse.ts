#!/usr/bin/env node
import * as os from 'os';
import { reportLhr } from './lhr/lhr';

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function replacePathForWindowFormat(folderSearch) {
  // replace '\' and '/' with '\\' to make this regexp works on Windows
  if (folderSearch && os.platform() === 'win32') {
    return folderSearch.replace(/\\|\//g, '\\\\');
  }
  return folderSearch;
}

async function runChrome({
  url,
  onlyCategories,
  isFastOption = false,
}: {
  url: string;
  onlyCategories: string[];
  isFastOption: boolean;
}) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const throttling = isFastOption
    ? {
        rttMs: 40,
        cpuSlowdownMultiplier: 1,
        throughputKbps: 10240,
      }
    : undefined;
  const chromeOptions = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
    onlyCategories,
    throttling,
  };
  const runnerResult = await lighthouse(url, chromeOptions);

  await chrome.kill();

  return runnerResult;
}

export async function runLightHouse({ logger, options, path, url, onlyCategories, isFastOption }) {
  // let folderSearch = args.folder;
  // folderSearch = replacePathForWindowFormat(folderSearch);

  return await runChrome({
    url,
    onlyCategories,
    isFastOption,
  });
}
