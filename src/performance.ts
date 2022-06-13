#!/usr/bin/env node
import { l2s } from './l2s';
import { runLightHouse } from './lighthouse/lighthouse';
import { generateMarkdown } from './markdown';
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
  .action(async ({ logger, args, options }) => {
    const { title, url } = args;
    logger.info(`Starting lighthouse metric to statistics conversion in ${options.mode} mode`);

    if (options.mode === 'once') {
      await runLightHouse({ logger, options, path: title, url: url });
      await l2s({ path: title });
      await generateMarkdown({ path: title });
    }
    // The recommendation is do each LH run in a separate process. The performance metrics will be affected.
    // https://github.com/GoogleChrome/lighthouse/issues/7187
  });

program.run();
