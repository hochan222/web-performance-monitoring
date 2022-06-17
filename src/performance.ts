#!/usr/bin/env node
import { ECOMMERCE_KEYWORD_LAPTOP, _11ST_KEYWORDS } from '../config/settings';
import { l2s } from './l2s';
import { runLightHouse } from './lighthouse/lighthouse';
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
    validator: ['once'],
  })
  .argument('[title]', 'title')
  .argument('[url]', 'url')
  .argument('[fast]', 'fast')
  .action(async ({ logger, args, options }) => {
    const { title, url, fast } = args;
    logger.info(`Starting lighthouse metric to statistics conversion in ${options.mode} mode`);

    if (options.mode === 'once') {
      const isFastOption = fast === 'fast';
      const path = isFastOption ? `${title}-fast` : title;

      await runLightHouse({ logger, options, path, url: url, isFastOption });
      await l2s({ path, isFastOption });
      if (!isFastOption) {
        await generateReport({ path });
      }
    }
    // The recommendation is do each LH run in a separate process. The performance metrics will be affected.
    // https://github.com/GoogleChrome/lighthouse/issues/7187
  })

  .command('diff', 'Compare lighthouse metric')
  .argument('[fast]', 'fast')
  .action(async ({ args }) => {
    const { fast } = args;
    const isFastOption = fast === 'fast';

    await generateDiff(ECOMMERCE_KEYWORD_LAPTOP, isFastOption, 'ecommerce-search');
  })

  .command('11st-keywords', 'Compare 11st keywords metrics')
  .argument('[fast]', 'fast')
  .action(async ({ args }) => {
    const { fast } = args;
    const isFastOption = fast === 'fast';

    await generateDiff(_11ST_KEYWORDS, isFastOption, '11st');
  });
program.run();
