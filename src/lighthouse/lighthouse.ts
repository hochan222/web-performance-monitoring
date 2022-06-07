#!/usr/bin/env node
import * as fs from 'fs';
import { reportAudits } from './lhr/audits';

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
  const runnerResult = await lighthouse('https://naver.com', options);

  // `.report` is the HTML report as a string
  //   const reportHtml = runnerResult.report;
  //   fs.writeFileSync('report/lhreport.json', JSON.stringify(runnerResult));
  const { lhr, artifacts, report } = runnerResult;

  reportAudits(lhr);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();
