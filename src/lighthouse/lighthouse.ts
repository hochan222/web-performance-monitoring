#!/usr/bin/env node
import * as os from 'os';

import { reportAudits } from './lhr/audits';

const URL =
  'http://search.11st.co.kr/MW/search?searchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581&decSearchKeyword=%25EB%2585%25B8%25ED%258A%25B8%25EB%25B6%2581#_filterKey=1648181889888';
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

function replacePathForWindowFormat(folderSearch) {
  // replace '\' and '/' with '\\' to make this regexp works on Windows
  if (folderSearch && os.platform() === 'win32') {
    return folderSearch.replace(/\\|\//g, '\\\\');
  }
  return folderSearch;
}

async function runChrome() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const chromeOptions = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
  const runnerResult = await lighthouse(URL, chromeOptions);

  await chrome.kill();

  return runnerResult;
}

export async function runLightHouse({ logger, args, options }) {
  let folderSearch = args.folder;
  folderSearch = replacePathForWindowFormat(folderSearch);

  const { lhr, artifacts, report } = await runChrome();

  reportAudits(lhr);

  console.log('Report is done for', lhr.finalUrl);
  console.log('Performance score was', lhr.categories.performance.score * 100);
}
