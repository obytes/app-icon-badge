import { parseBadgeJsonConfigFile } from './parse-badge-json-config-file';
import fs from 'fs';
import path, { parse } from 'path';
import { IconConfig } from './make-icon';
import { addBadge } from '..';
import { Badge } from '../types';
import { Command, Option } from 'commander';

const program = new Command();
program
  .description('command line for app-icon-badge')
  .version('0.0.1')
  .name('app-icon-badge');

// default command
program
  .addCommand(
    new Command('add-badge')
      .description('add badge to icon using add-badge by default')
      .argument('<iconPath>')
      .addOption(
        new Option('-t, --type <type>', 'badge type')
          .choices(['banner', 'ribbon'])
          .makeOptionMandatory()
      )
      .addOption(
        new Option('-x, --text <text>', 'badge text').makeOptionMandatory()
      )
      .addOption(
        new Option(
          '-p, --position <position>',
          'badge position banner:top,bottom ribbon:left,right'
        ).choices(['top', 'left', 'right', 'bottom'])
      )
      .addOption(
        new Option('-b, --background <background>', 'badge background color')
      )
      .addOption(
        new Option('-c, --color <color>', 'badge color')
          .choices(['white', 'black'])
          .default('white')
      )
      .action((iconPath, opts) => {
        program.setOptionValue('iconPath', iconPath);
        program.setOptionValue('badge', opts);
      }),
    {
      isDefault: true,
    }
  )
  .showHelpAfterError();

program.addCommand(
  new Command('use-config')
    .description('use json file as a config')
    .argument('<configPath>')
    .action((configPath) => {
      console.log(configPath);
    })
);

export async function parseArgument() {
  if (process.argv.length <= 2) {
    program.help();
  }
  const opts = program.parse().opts();
  if (opts.iconPath) {
    const badges: Badge = opts.badge;
    const icon = new IconConfig({ icon: opts.iconPath, badges: [badges] });
    addBadge(icon);
  } else if (opts.badges_config) {
    parseBadgeJsonConfigFile(opts.badges_config);
  }
}
