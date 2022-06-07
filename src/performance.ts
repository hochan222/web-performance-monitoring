#!/usr/bin/env node
import { l2s } from './l2s';
import { runLightHouse } from './lighthouse/lighthouse';
import { generateMarkdown } from './markdown/markdown';
const { program } = require('@caporal/core');

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
    logger.info(`Starting lighthouse metric to statistics conversion in ${options.mode} mode`);

    await runLightHouse({ logger, args, options });
    await l2s();
    await generateMarkdown();
  });

program.run();
