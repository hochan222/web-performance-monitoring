#!/usr/bin/env node
import { ECOMMERCE_KEYWORD_LAPTOP } from '../config/settings';
import { l2s } from './l2s';
import { runLightHouse } from './lighthouse/lighthouse';
import { generateOnlyPerformanceTempData, generateTempData } from './lighthouse/tempData';
import { generateDiff, generateReport } from './markdown';
const { program } = require('@caporal/core');

program
  .bin('yarn test')
  .name('test')
  .version('0.0.1')
  .disableGlobalOption('--silent')
  .cast(false)

  .command('l2s', 'Convert lighthouse metric to statistics')
  .option('--mode <mode>', 'Mode to be run in', {
    default: 'once',
    validator: ['once', 'only-performance'],
  })
  .argument('[title]', 'title')
  .argument('[url]', 'url')
  .argument('[fast]', 'fast')
  .action(async ({ logger, args, options }) => {
    const { title, url, fast } = args;
    logger.info(`Starting lighthouse metric to statistics conversion in ${options.mode} mode`);

    if (options.mode === 'only-performance') {
      const data = await runLightHouse({
        logger,
        options,
        path: title,
        url: url,
        onlyCategories: ['performance'],
        isFastOption: fast === 'fast',
      });
      generateOnlyPerformanceTempData(data, title);
      return;
    }

    if (options.mode === 'once') {
      const data = await runLightHouse({
        logger,
        options,
        path: title,
        url: url,
        onlyCategories: ['performance', 'best-practices', 'accessibility', 'seo', 'pwa'],
        isFastOption: fast === 'fast',
      });
      generateTempData(data, title);
      await l2s({ path: title });
      await generateReport({ path: title });
    }
    // The recommendation is do each LH run in a separate process. The performance metrics will be affected.
    // https://github.com/GoogleChrome/lighthouse/issues/7187
  })

  .command('diff', 'Compare lighthouse metric')
  .action(async ({ logger, args, options }) => {
    await generateDiff(ECOMMERCE_KEYWORD_LAPTOP);
  });
program.run();
