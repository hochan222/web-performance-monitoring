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

async function runChrome(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const chromeOptions = {
    logLevel: 'info',
    output: 'json',
    port: chrome.port,
    onlyCategories: ['performance', 'best-practices', 'accessibility', 'seo', 'pwa'],
    throttling: {
      // rttMs: 40,
      // cpuSlowdownMultiplier: 1,
      // throughputKbps: 10240,
    },
  };
  const runnerResult = await lighthouse(url, chromeOptions);

  await chrome.kill();

  return runnerResult;
}

export async function runLightHouse({ logger, options, path, url }) {
  // let folderSearch = args.folder;
  // folderSearch = replacePathForWindowFormat(folderSearch);

  const { lhr, artifacts, report } = await runChrome(url);

  reportLhr(lhr, path);

  console.log('Report is done for', lhr.finalUrl);
}
