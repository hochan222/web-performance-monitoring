#!/usr/bin/env node
import * as fs from 'fs';
import * as os from 'os';
import { l2s } from './l2s';

import { reportAudits } from './lighthouse/lhr/audits';

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const { program } = require('@caporal/core');

function replacePathForWindowFormat(folderSearch) {
  // replace '\' and '/' with '\\' to make this regexp works on Windows
  if (folderSearch && os.platform() === 'win32') {
    return folderSearch.replace(/\\|\//g, '\\\\');
  }
  return folderSearch;
}

program
  .bin('yarn test')
  .name('test')
  .version('0.0.1')
  .disableGlobalOption('--silent')
  .cast(false)

  .command('l2s', 'Convert lighthouse metric to statistics')
  .option('--mode <mode>', 'Mode to be run in', {
    default: 'basic',
    validator: ['basic', 'detail'],
  })
  .argument('[folder]', 'convert by folder')
  .action(async ({ logger, args, options }) => {
    let folderSearch = args.folder;

    logger.info(`Starting lighthouse metric to statistics conversion in ${options.mode} mode`);
    folderSearch = replacePathForWindowFormat(folderSearch);

    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const chromeOptions = { logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port };
    const runnerResult = await lighthouse('https://naver.com', chromeOptions);

    // `.report` is the HTML report as a string
    //   const reportHtml = runnerResult.report;
    //   fs.writeFileSync('report/lhreport.json', JSON.stringify(runnerResult));
    const { lhr, artifacts, report } = runnerResult;

    await reportAudits(lhr);
    l2s();

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();
  });

program.run();
